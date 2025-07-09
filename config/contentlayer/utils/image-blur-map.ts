import sharp from 'sharp';

import { getAbsoluteImagePathFromMdx } from './mdx-image-path';

export type BlurMap = Record<string, { blur: string; ratio: number }>;

export const createBlurDataUrlFromImage = async (
  src: string,
): Promise<{ blur: string; ratio: number }> => {
  try {
    const imageInput = await loadImageInput(src);
    const metadata = await sharp(imageInput).metadata();

    if (!metadata.width || !metadata.height) {
      throw new Error('Failed to get image dimensions');
    }

    const { data: buffer, info: meta } = await sharp(imageInput)
      .resize(128, 128, { fit: 'inside' })
      .blur(5)
      .toBuffer({ resolveWithObject: true });

    return {
      blur: `data:image/${meta.format};base64,${buffer.toString('base64')}`,
      ratio: metadata.width / metadata.height,
    };
  } catch (err) {
    console.error(`Failed to create blur for image: ${src}`, err);
    throw new Error(`createBlurDataUrlFromImage failed: ${(err as Error).message}`);
  }
};

const loadImageInput = async (src: string): Promise<Buffer | string> => {
  if (/^https?:\/\//.test(src)) {
    const response = await fetch(src);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  return src;
};

export const createImageBlurMap = async (
  mdxFilePath: string,
  imagePaths: string[],
): Promise<BlurMap> => {
  const entries = await Promise.all(
    imagePaths.map(async (relativePath) => {
      try {
        const absolutePath = getAbsoluteImagePathFromMdx(mdxFilePath, relativePath);
        const { blur, ratio } = await createBlurDataUrlFromImage(absolutePath);
        return [relativePath, { blur, ratio }] as const;
      } catch (err) {
        console.error(`Failed to process image: ${relativePath}`, err);
        return [relativePath, { blur: '', ratio: 0 }] as const;
      }
    }),
  );

  return Object.fromEntries(entries);
};
