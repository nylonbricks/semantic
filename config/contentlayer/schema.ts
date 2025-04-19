import { defineDocumentType } from 'contentlayer2/source-files';

import { getBlurDataUrl, getBlurMap, getMdxImagePaths, resolveMdxImagePath, resolveImagePath } from './utils';

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `pages/**/*.mdx`,
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
    coverBlurDataURL: {
      type: 'json',
      resolve: async (doc) => {
        const images = getMdxImagePaths(doc.body.raw);
        return getBlurMap(doc._raw.sourceFilePath, images);
      },
    },
  },
}));

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
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
      resolve: (doc) => resolveImagePath(doc._raw.sourceFilePath, doc.coverImage),
    },
    coverBlurDataURL: {
      type: 'string',
      resolve: async (doc) => {
        const imgPath = resolveMdxImagePath(doc._raw.sourceFilePath, doc.coverImage);
        return getBlurDataUrl(imgPath);
      },
    },
    blurDataURLs: {
      type: 'json',
      resolve: async (doc) => {
        const images = getMdxImagePaths(doc.body.raw);
        return getBlurMap(doc._raw.sourceFilePath, images);
      },
    },
  },
}));
