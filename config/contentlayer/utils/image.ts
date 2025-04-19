import sharp from 'sharp';

import { resolveMdxImageAbsolutePath } from './path';

export interface BlurMap {
  [key: string]: string;
}

export const generateBlurredImageDataUrl = async (src: string): Promise<string> => {
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

export const generateImageBlurMap = async (
  mdxFile: string,
  imagePaths: string[],
): Promise<BlurMap> => {
  const map: BlurMap = {};
  for (const img of imagePaths) {
    try {
      const abs = resolveMdxImageAbsolutePath(mdxFile, img);
      map[img] = await generateBlurredImageDataUrl(abs);
    } catch (err) {
      console.error(`❌ Failed image: ${img}`, err);
      map[img] = '';
    }
  }
  return map;
};
