import path from 'path';
import sharp from 'sharp';

export interface BlurMap {
  [key: string]: string;
}

export const generateBlurDataURL = async (imgPath: string): Promise<string> => {
  try {
    const buffer = await sharp(imgPath).resize(60, 60, { fit: 'inside' }).blur(5).toBuffer();

    const ext = path.extname(imgPath).slice(1).toLowerCase() || 'jpeg';
    const mimeType = ext === 'jpg' ? 'jpeg' : ext;

    return `data:image/${mimeType};base64,${buffer.toString('base64')}`;
  } catch (error) {
    console.error(`Failed to generate blur data URL for ${imgPath}:`, error);
    throw error;
  }
};

export const extractImagesFromMdx = (raw: string): string[] => {
  const regex = /!\[.*?]\((.*?)\)/g;
  const matches: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(raw))) {
    const imagePath = match[1].trim();
    if (imagePath) {
      matches.push(imagePath);
    }
  }

  return matches;
};

export const resolveImagePath = (sourceFilePath: string, imagePath: string): string => {
  const baseDir = path.dirname(sourceFilePath).replace(/^content[\\/]/, '');
  const relativePath = imagePath.startsWith('./') ? imagePath.slice(2) : imagePath;
  return path.join(process.cwd(), 'content', baseDir, relativePath);
};

export const processImages = async (sourceFilePath: string, images: string[]): Promise<BlurMap> => {
  const blurMap: BlurMap = {};

  for (const src of images) {
    try {
      const imgPath = resolveImagePath(sourceFilePath, src);
      blurMap[src] = await generateBlurDataURL(imgPath);
    } catch (error) {
      console.error(`Failed to process image: ${src}`, error);
      blurMap[src] = '';
    }
  }

  return blurMap;
}; 