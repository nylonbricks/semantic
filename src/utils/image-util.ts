import { readFile } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

interface BlurImageOptions {
  width?: number;
  height?: number;
  blur?: number;
}

export const getBlurDataURL = async (url: string, options: BlurImageOptions = {}) => {
  const { width = 20, height = 20, blur = 5 } = options;
  let buffer: Buffer;

  if (url.startsWith('http')) {
    const response = await fetch(url);
    buffer = Buffer.from(await response.arrayBuffer());
  } else {
    const imagePath = path.join(process.cwd(), 'public', url);
    buffer = await readFile(imagePath);
  }

  const { data, info } = await sharp(buffer)
    .resize(width, height, { fit: 'inside' })
    .blur(blur)
    .toBuffer({ resolveWithObject: true });

  return `data:image/${info.format};base64,${data.toString('base64')}`;
};
