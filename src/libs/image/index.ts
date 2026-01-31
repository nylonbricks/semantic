import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export interface BlurData {
  blur: string;
  ratio: number;
}

export interface BlurOptions {
  width?: number;
  height?: number;
  blur?: number;
}
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
      throw new Error(
        `Failed to fetch image: ${response.status} ${response.statusText}`
      );
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  let fullPath: string;

  if (isSystemPath(imagePath)) {
    fullPath = imagePath;
  } else if (imagePath.startsWith("/")) {
    fullPath = path.join(process.cwd(), "public", imagePath);
  } else {
    fullPath = imagePath;
  }

  return await readFile(fullPath);
};

export const createBlur = async (
  imagePath: string,
  options: BlurOptions = {}
): Promise<string> => {
  const { width = 20, height = 20, blur = BLUR_STRENGTH } = options;

  try {
    const buffer = await loadBuffer(imagePath);
    const { data, info } = await sharp(buffer)
      .resize(width, height, { fit: "inside" })
      .blur(blur)
      .toBuffer({ resolveWithObject: true });

    return `data:image/${info.format};base64,${data.toString("base64")}`;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(`Failed to create blur for image: ${imagePath}`, error);
    throw new Error(`createBlur failed: ${errorMessage}`);
  }
};

export const createBlurData = async (imagePath: string): Promise<BlurData> => {
  try {
    const buffer = await loadBuffer(imagePath);
    const metadata = await sharp(buffer).metadata();

    if (!(metadata.width && metadata.height)) {
      throw new Error("Failed to get image dimensions");
    }

    const { data, info } = await sharp(buffer)
      .resize(BLUR_SIZE, BLUR_SIZE, { fit: "inside" })
      .blur(BLUR_STRENGTH)
      .toBuffer({ resolveWithObject: true });

    return {
      blur: `data:image/${info.format};base64,${data.toString("base64")}`,
      ratio: metadata.width / metadata.height,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(`Failed to create blur data for image: ${imagePath}`, error);
    throw new Error(`createBlurData failed: ${errorMessage}`);
  }
};
