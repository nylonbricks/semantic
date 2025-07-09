import { defineDocumentType } from 'contentlayer2/source-files';

import { createImageBlurMap, findMarkdownImagePaths, processMdxImages } from './utils';

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `pages/**/*.{md,mdx}`,
  contentType: 'mdx',
  fields: {
    createdAt: { type: 'date', required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) =>
        doc._raw.sourceFileDir.split('/')[1] ?? doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
    blurMap: {
      type: 'json',
      resolve: async (doc) => {
        const images: string[] = findMarkdownImagePaths(doc.body.raw);
        return createImageBlurMap(doc._raw.sourceFilePath, images);
      },
    },
    body: {
      type: 'mdx',
      resolve: (doc) => processMdxImages(doc),
    },
  },
}));

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.{md,mdx}`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    subtitle: { type: 'string', required: true },
    createdAt: { type: 'date', required: true },
    modifiedAt: { type: 'date', required: true },
    coverImage: { type: 'string', required: true },
    category: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: false },
    comments: { type: 'boolean', required: false, default: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) =>
        doc._raw.sourceFileDir.split('/')[1] ?? doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
    blurMap: {
      type: 'json',
      resolve: async (doc) => {
        const images: string[] = findMarkdownImagePaths(doc.body.raw);
        return createImageBlurMap(doc._raw.sourceFilePath, images);
      },
    },
    coverImage: {
      type: 'string',
      resolve: (doc) => {
        const originalPath = doc.coverImage;

        // URL이면 그대로 반환
        if (originalPath.startsWith('http://') || originalPath.startsWith('https://')) {
          return originalPath;
        }

        // 상대경로면 /content/ 경로로 변환
        const mdxDirectory = doc._raw.sourceFileDir;
        const cleanPath = originalPath.startsWith('./') ? originalPath.slice(2) : originalPath;
        return `/content/${mdxDirectory}/${cleanPath}`;
      },
    },
    body: {
      type: 'mdx',
      resolve: (doc) => processMdxImages(doc),
    },
  },
}));
