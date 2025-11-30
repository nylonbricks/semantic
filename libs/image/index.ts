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
  r2Folder?: string;
};

export interface BlurOptions {
  width?: number;
  height?: number;
  blur?: number;
}

const MDX_IMAGE_REGEX = /!\[.*?]\((.*?)\)/g;
const BLUR_SIZE = 128;
const BLUR_STRENGTH = 5;

export const isUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const isSystemPath = (imagePath: string): boolean => {
  if (!path.isAbsolute(imagePath)) {
    return false;
  }
  return imagePath.startsWith(process.cwd());
};

const loadBuffer = async (imagePath: string): Promise<Buffer> => {
  if (isUrl(imagePath)) {
    const response = await fetch(imagePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  let fullPath: string;

  if (isSystemPath(imagePath)) {
    fullPath = imagePath;
  } else if (imagePath.startsWith('/')) {
    fullPath = path.join(process.cwd(), 'public', imagePath);
  } else {
    fullPath = imagePath;
  }

  return await readFile(fullPath);
};

export const createBlur = async (imagePath: string, options: BlurOptions = {}): Promise<string> => {
  const { width = 20, height = 20, blur = BLUR_STRENGTH } = options;

  try {
    const buffer = await loadBuffer(imagePath);
    const { data, info } = await sharp(buffer)
      .resize(width, height, { fit: 'inside' })
      .blur(blur)
      .toBuffer({ resolveWithObject: true });

    return `data:image/${info.format};base64,${data.toString('base64')}`;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Failed to create blur for image: ${imagePath}`, error);
    throw new Error(`createBlur failed: ${errorMessage}`);
  }
};

export const createBlurData = async (imagePath: string): Promise<BlurData> => {
  try {
    const buffer = await loadBuffer(imagePath);
    const metadata = await sharp(buffer).metadata();

    if (!metadata.width || !metadata.height) {
      throw new Error('Failed to get image dimensions');
    }

    const { data, info } = await sharp(buffer)
      .resize(BLUR_SIZE, BLUR_SIZE, { fit: 'inside' })
      .blur(BLUR_STRENGTH)
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
  const images: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = MDX_IMAGE_REGEX.exec(mdxContent))) {
    const imagePath = match[1]?.trim();
    if (imagePath) {
      images.push(imagePath);
    }
  }

  return images;
};

export const resolveSystemPath = (mdxFilePath: string, imagePath: string): string => {
  if (isUrl(imagePath)) {
    return imagePath;
  }

  const mdxDir = path.dirname(mdxFilePath).replace(/^content[\\/]/, '');
  const cleanPath = imagePath.startsWith('./') ? imagePath.slice(2) : imagePath;

  return path.join(process.cwd(), 'content', mdxDir, cleanPath);
};

export const resolveWebPath = (mdxFilePath: string, imagePath: string): string => {
  if (isUrl(imagePath)) {
    return imagePath;
  }

  const mdxDir = path.dirname(mdxFilePath).replace(/^content[\\/]/, '');
  const cleanPath = imagePath.startsWith('./') ? imagePath.slice(2) : imagePath;

  return `/content/${path.join(mdxDir, cleanPath).replace(/\\/g, '/')}`;
};

export const resolveAssetPath = (directory: string, assetPath: string): string => {
  if (isUrl(assetPath)) {
    return assetPath;
  }

  const cleanPath = assetPath.startsWith('./') ? assetPath.slice(2) : assetPath;
  return `/content/${directory}/${cleanPath}`;
};

export const resolveR2Path = (
  r2Folder: string,
  imagePath: string,
  contentType: 'posts' | 'projects',
): string => {
  if (isUrl(imagePath)) {
    return imagePath;
  }

  const cleanPath = imagePath.startsWith('./') ? imagePath.slice(2) : imagePath;
  return `https://img.stile.im/${contentType}/${r2Folder}/${cleanPath}`;
};

export const createBlurMap = async (mdxFilePath: string, images: string[]): Promise<BlurMap> => {
  const entries = await Promise.all(
    images.map(async (imagePath) => {
      try {
        const systemPath = resolveSystemPath(mdxFilePath, imagePath);
        const blurData = await createBlurData(systemPath);
        return [imagePath, blurData] as const;
      } catch (error) {
        console.error(`Failed to process image: ${imagePath}`, error);
        return [imagePath, { blur: '', ratio: 0 }] as const;
      }
    }),
  );

  return Object.fromEntries(entries);
};

export const transformMdxImages = (
  document: MdxDocument,
  r2Folder?: string,
  contentType: 'posts' | 'projects' = 'posts',
) => {
  const images = extractImages(document.body.raw);
  let rawContent = document.body.raw;
  let codeContent = document.body.code;

  for (const imagePath of images) {
    if (!isUrl(imagePath)) {
      // Use R2 path if r2Folder is provided, otherwise use local web path
      const webPath = r2Folder
        ? resolveR2Path(r2Folder, imagePath, contentType)
        : resolveWebPath(document._raw.sourceFilePath, imagePath);

      const escapedPath = imagePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      const markdownRegex = new RegExp(`!\\[.*?\\]\\(${escapedPath}\\)`, 'g');
      rawContent = rawContent.replace(markdownRegex, `![image](${webPath})`);

      const jsxRegex = new RegExp(`src:\\s*["']${escapedPath}["']`, 'g');
      codeContent = codeContent.replace(jsxRegex, `src:"${webPath}"`);
    }
  }

  return {
    raw: rawContent,
    code: codeContent,
  };
};
