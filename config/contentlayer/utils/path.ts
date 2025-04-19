import path from 'path';

export const isValidUrl = (path: string): boolean => {
  try {
    new URL(path);
    return true;
  } catch {
    return false;
  }
};

export const resolveContentImagePath = (mdxFile: string, imgPath: string): string => {
  if (isValidUrl(imgPath)) {
    return imgPath;
  }

  const dir = path.dirname(mdxFile).replace(/^content[\\/]/, '');
  const rel = imgPath.startsWith('./') ? imgPath.slice(2) : imgPath;
  return `/content/${path.join(dir, rel)}`;
};

export const resolveMdxImageAbsolutePath = (mdxFile: string, imgRel: string): string => {
  if (isValidUrl(imgRel)) {
    return imgRel;
  }

  const dir = path.dirname(mdxFile).replace(/^content[\\/]/, '');
  const rel = imgRel.startsWith('./') ? imgRel.slice(2) : imgRel;
  return path.join(process.cwd(), 'content', dir, rel);
};
