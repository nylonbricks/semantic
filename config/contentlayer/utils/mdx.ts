import { resolveContentImagePath, isValidUrl } from './path';

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

export const processMdxImages = (doc: { body: { raw: string; code: string }; _raw: { sourceFilePath: string } }) => {
  const images = extractImagePathsFromMdx(doc.body.raw);
  let processedRaw = doc.body.raw;
  let processedCode = doc.body.code;

  for (const img of images) {
    if (!isValidUrl(img)) {
      const resolvedPath = resolveContentImagePath(doc._raw.sourceFilePath, img);

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