import { readFile } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export type BlurData = {
  blur: string;
  ratio: number;
};

export type BlurMap = Record<string, BlurData>;

export type MdxDocument = {
  body: { raw: string; code: string };
  _raw: { sourceFilePath: string };
};

export interface BlurOptions {
  width?: number;
  height?: number;
  blur?: number;
}

const IMAGE_REGEX = /!\[.*?]\((.*?)\)/g;
const DEFAULT_BLUR_SIZE = 128;
const DEFAULT_BLUR_INTENSITY = 5;

export const isUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const cleanImagePath = (imagePath: string): string => {
  return imagePath.startsWith('./') ? imagePath.slice(2) : imagePath;
};

const getMdxDirectory = (mdxFilePath: string): string => {
  return path.dirname(mdxFilePath).replace(/^content[\\/]/, '');
};

const escapeRegex = (text: string): string => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const loadImageBuffer = async (imagePath: string): Promise<Buffer> => {
  if (isUrl(imagePath)) {
    const response = await fetch(imagePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  const fullPath = imagePath.startsWith('/')
    ? path.join(process.cwd(), 'public', imagePath)
    : imagePath;

  return await readFile(fullPath);
};

export const createBlurDataUrl = async (
  imagePath: string,
  options: BlurOptions = {},
): Promise<string> => {
  const { width = 20, height = 20, blur = DEFAULT_BLUR_INTENSITY } = options;

  try {
    const buffer = await loadImageBuffer(imagePath);
    const { data, info } = await sharp(buffer)
      .resize(width, height, { fit: 'inside' })
      .blur(blur)
      .toBuffer({ resolveWithObject: true });

    return `data:image/${info.format};base64,${data.toString('base64')}`;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Failed to create blur data URL for image: ${imagePath}`, error);
    throw new Error(`createBlurDataUrl failed: ${errorMessage}`);
  }
};

export const createBlurData = async (imagePath: string): Promise<BlurData> => {
  try {
    const buffer = await loadImageBuffer(imagePath);
    const metadata = await sharp(buffer).metadata();

    if (!metadata.width || !metadata.height) {
      throw new Error('Failed to get image dimensions');
    }

    const { data, info } = await sharp(buffer)
      .resize(DEFAULT_BLUR_SIZE, DEFAULT_BLUR_SIZE, { fit: 'inside' })
      .blur(DEFAULT_BLUR_INTENSITY)
      .toBuffer({ resolveWithObject: true });

    return {
      blur: `data:image/${info.format};base64,${data.toString('base64')}`,
      ratio: metadata.width / metadata.height,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Failed to create blur data for image: ${imagePath}`, error);
    throw new Error(`createBlurData failed: ${errorMessage}`);
  }
};

export const extractImages = (mdxContent: string): string[] => {
  const imagePaths: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = IMAGE_REGEX.exec(mdxContent))) {
    const imagePath = match[1]?.trim();
    if (imagePath) {
      imagePaths.push(imagePath);
    }
  }

  return imagePaths;
};

export const resolveAbsolutePath = (mdxFilePath: string, imagePath: string): string => {
  if (isUrl(imagePath)) {
    return imagePath;
  }

  const mdxDir = getMdxDirectory(mdxFilePath);
  const cleanPath = cleanImagePath(imagePath);

  return path.join(process.cwd(), 'content', mdxDir, cleanPath);
};

export const resolveContentPath = (mdxFilePath: string, imagePath: string): string => {
  if (isUrl(imagePath)) {
    return imagePath;
  }

  const mdxDir = getMdxDirectory(mdxFilePath);
  const cleanPath = cleanImagePath(imagePath);

  return `/content/${path.join(mdxDir, cleanPath).replace(/\\/g, '/')}`;
};

export const resolveAssetPath = (directory: string, assetPath: string): string => {
  if (isUrl(assetPath)) {
    return assetPath;
  }

  const cleanPath = cleanImagePath(assetPath);
  return `/content/${directory}/${cleanPath}`;
};

export const createBlurMap = async (
  mdxFilePath: string,
  imagePaths: string[],
): Promise<BlurMap> => {
  const blurEntries = await Promise.all(
    imagePaths.map(async (imagePath) => {
      try {
        const absolutePath = resolveAbsolutePath(mdxFilePath, imagePath);
        const blurData = await createBlurData(absolutePath);
        return [imagePath, blurData] as const;
      } catch (error) {
        console.error(`Failed to process image: ${imagePath}`, error);
        return [imagePath, { blur: '', ratio: 0 }] as const;
      }
    }),
  );

  return Object.fromEntries(blurEntries);
};

export const transformImagePaths = (document: MdxDocument) => {
  const imagePaths = extractImages(document.body.raw);
  let transformedRaw = document.body.raw;
  let transformedCode = document.body.code;

  for (const imagePath of imagePaths) {
    if (!isUrl(imagePath)) {
      const resolvedPath = resolveContentPath(document._raw.sourceFilePath, imagePath);
      const escapedPath = escapeRegex(imagePath);

      const markdownRegex = new RegExp(`!\\[.*?\\]\\(${escapedPath}\\)`, 'g');
      transformedRaw = transformedRaw.replace(markdownRegex, `![image](${resolvedPath})`);

      const jsxRegex = new RegExp(`src:\\s*["']${escapedPath}["']`, 'g');
      transformedCode = transformedCode.replace(jsxRegex, `src:"${resolvedPath}"`);
    }
  }

  return {
    raw: transformedRaw,
    code: transformedCode,
  };
};
