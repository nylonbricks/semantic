import { defineDocumentType } from 'contentlayer2/source-files';

import {
  generateBlurredImageDataUrl,
  generateImageBlurMap,
  extractImagePathsFromMdx,
  resolveMdxImageAbsolutePath,
  resolveContentImagePath,
  processMdxImages,
} from './utils';

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
        const images = extractImagePathsFromMdx(doc.body.raw);
        return generateImageBlurMap(doc._raw.sourceFilePath, images);
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
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) =>
        doc._raw.sourceFileDir.split('/')[1] ?? doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
    coverImage: {
      type: 'string',
      resolve: (doc) => resolveContentImagePath(doc._raw.sourceFilePath, doc.coverImage),
    },
    coverBlur: {
      type: 'string',
      resolve: async (doc) => {
        const imgPath = resolveMdxImageAbsolutePath(doc._raw.sourceFilePath, doc.coverImage);
        return generateBlurredImageDataUrl(imgPath);
      },
    },
    blurMap: {
      type: 'json',
      resolve: async (doc) => {
        const images = extractImagePathsFromMdx(doc.body.raw);
        return generateImageBlurMap(doc._raw.sourceFilePath, images);
      },
    },
    body: {
      type: 'mdx',
      resolve: (doc) => processMdxImages(doc),
    },
  },
}));
