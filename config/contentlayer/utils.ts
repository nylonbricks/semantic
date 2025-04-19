import path from 'path';
import sharp from 'sharp';

export interface BlurMap {
  [originalPath: string]: string;
}

export const createBlurPlaceholder = async (imageFilePath: string): Promise<string> => {
  try {
    const { data: buffer, info: metadata } = await sharp(imageFilePath)
      .resize(60, 60, { fit: 'inside' })
      .blur(5)
      .toBuffer({ resolveWithObject: true });

    const mime = `image/${metadata.format}`;
    return `data:${mime};base64,${buffer.toString('base64')}`;
  } catch (err) {
    console.error(`❌ Failed to generate blur data URL for: ${imageFilePath}`, err);
    throw err;
  }
};

export const parseMdxImagePaths = (mdxContent: string): string[] => {
  const imageRegex = /!\[.*?]\((.*?)\)/g;
  const imagePaths: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = imageRegex.exec(mdxContent))) {
    const rawPath = match[1].trim();
    if (rawPath) {
      imagePaths.push(rawPath);
    }
  }

  return imagePaths;
};

export const getAbsoluteImagePath = (sourceFile: string, relativeImagePath: string): string => {
  const contentDir = path.dirname(sourceFile).replace(/^content[\\/]/, '');
  const normalizedPath = relativeImagePath.startsWith('./')
    ? relativeImagePath.substring(2)
    : relativeImagePath;

  return path.join(process.cwd(), 'content', contentDir, normalizedPath);
};

export const generateBlurMap = async (
  mdxSourcePath: string,
  imagePaths: string[],
): Promise<BlurMap> => {
  const blurMap: BlurMap = {};

  for (const relativePath of imagePaths) {
    try {
      const absolutePath = getAbsoluteImagePath(mdxSourcePath, relativePath);
      blurMap[relativePath] = await createBlurPlaceholder(absolutePath);
    } catch (err) {
      console.error(`⚠️ Failed to process image: ${relativePath}`, err);
      blurMap[relativePath] = '';
    }
  }

  return blurMap;
};
