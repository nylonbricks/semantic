import path from 'path';

export const isValidUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

export const getAbsoluteImagePathFromMdx = (mdxFilePath: string, imagePath: string): string => {
  if (isValidUrl(imagePath)) {
    return imagePath;
  }

  const mdxDirectory = path.dirname(mdxFilePath).replace(/^content[\\/]/, '');
  const relativeImagePath = imagePath.startsWith('./') ? imagePath.slice(2) : imagePath;

  return path.join(process.cwd(), 'content', mdxDirectory, relativeImagePath);
};

export const getContentImagePathFromMdx = (mdxFilePath: string, imagePath: string): string => {
  if (isValidUrl(imagePath)) {
    return imagePath;
  }

  const mdxDirectory = path.dirname(mdxFilePath).replace(/^content[\\/]/, '');
  const relativeImagePath = imagePath.startsWith('./') ? imagePath.slice(2) : imagePath;

  return `/content/${path.join(mdxDirectory, relativeImagePath).replace(/\\/g, '/')}`;
};

export const findMarkdownImagePaths = (mdxContent: string): string[] => {
  const imageRegex = /!\[.*?]\((.*?)\)/g;
  const paths: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = imageRegex.exec(mdxContent))) {
    const imagePath = match[1]?.trim();
    if (imagePath) paths.push(imagePath);
  }

  return paths;
};

export const extractImagePathsFromMdx = (mdx: string): string[] => {
  const re = /!\[.*?]\((.*?)\)/g;
  const paths: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(mdx))) {
    const p = m[1].trim();
    if (p) paths.push(p);
  }
  return paths;
};

export const processMdxImages = (doc: {
  body: { raw: string; code: string };
  _raw: { sourceFilePath: string };
}) => {
  const images = extractImagePathsFromMdx(doc.body.raw);
  let processedRaw = doc.body.raw;
  let processedCode = doc.body.code;

  for (const img of images) {
    if (!isValidUrl(img)) {
      const resolvedPath = getContentImagePathFromMdx(doc._raw.sourceFilePath, img);

      const markdownRegex = new RegExp(`!\\[.*?\\]\\(${img}\\)`, 'g');
      processedRaw = processedRaw.replace(markdownRegex, `![image](${resolvedPath})`);

      const jsxObjectRegex = new RegExp(`src:\\s*["']${img}["']`, 'g');
      processedCode = processedCode.replace(jsxObjectRegex, `src:"${resolvedPath}"`);
    }
  }

  return {
    raw: processedRaw,
    code: processedCode,
  };
};
