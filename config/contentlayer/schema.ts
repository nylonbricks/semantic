import { defineDocumentType } from 'contentlayer2/source-files';

import {
  parseMdxImagePaths,
  generateBlurMap,
  getAbsoluteImagePath,
  createBlurPlaceholder,
} from './utils';

const deriveSlug = (sourceDir: string, sourceFile: string): string => {
  const [, dirName] = sourceDir.split('/');
  return dirName ?? sourceFile.replace(/\.mdx$/, '');
};

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: 'pages/**/*.mdx',
  contentType: 'mdx',
  fields: {
    createdAt: { type: 'date', required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => deriveSlug(doc._raw.sourceFileDir, doc._raw.sourceFileName),
    },
    blurDataURLs: {
      type: 'json',
      resolve: async (doc) => {
        const paths = parseMdxImagePaths(doc.body.raw);
        return generateBlurMap(doc._raw.sourceFilePath, paths);
      },
    },
  },
}));

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    subtitle: { type: 'string', required: true },
    createdAt: { type: 'date', required: true },
    modifiedAt: { type: 'date', required: true },
    coverImage: { type: 'string', required: true },
    category: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' } },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => deriveSlug(doc._raw.sourceFileDir, doc._raw.sourceFileName),
    },
    blurCover: {
      type: 'string',
      resolve: async (doc) => {
        const abs = getAbsoluteImagePath(doc._raw.sourceFilePath, doc.coverImage);
        return createBlurPlaceholder(abs);
      },
    },
    blurDataURLs: {
      type: 'json',
      resolve: async (doc) => {
        const paths = parseMdxImagePaths(doc.body.raw);
        return generateBlurMap(doc._raw.sourceFilePath, paths);
      },
    },
  },
}));
