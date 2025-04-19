import path from 'path';
import sharp from 'sharp';

export interface BlurMap {
  [key: string]: string;
}

export const getBlurDataUrl = async (src: string): Promise<string> => {
  try {
    const { data: buf, info: meta } = await sharp(src)
      .resize(60, 60, { fit: 'inside' })
      .blur(5)
      .toBuffer({ resolveWithObject: true });
    return `data:image/${meta.format};base64,${buf.toString('base64')}`;
  } catch (err) {
    console.error(`❌ Failed blur URL: ${src}`, err);
    throw err;
  }
};

export const getMdxImagePaths = (mdx: string): string[] => {
  const re = /!\[.*?]\((.*?)\)/g;
  const paths: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(mdx))) {
    const p = m[1].trim();
    if (p) paths.push(p);
  }
  return paths;
};

export const resolveMdxImagePath = (mdxFile: string, imgRel: string): string => {
  const dir = path.dirname(mdxFile).replace(/^content[\\/]/, '');
  const rel = imgRel.startsWith('./') ? imgRel.slice(2) : imgRel;
  return path.join(process.cwd(), 'content', dir, rel);
};

export const getBlurMap = async (mdxFile: string, imagePaths: string[]): Promise<BlurMap> => {
  const map: BlurMap = {};
  for (const img of imagePaths) {
    try {
      const abs = resolveMdxImagePath(mdxFile, img);
      map[img] = await getBlurDataUrl(abs);
    } catch (err) {
      console.error(`❌ Failed image: ${img}`, err);
      map[img] = '';
    }
  }
  return map;
};
