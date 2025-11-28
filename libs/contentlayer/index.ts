import { defineDocumentType } from 'contentlayer2/source-files';

import {
  createBlurData,
  createBlurMap,
  extractImages,
  resolveAssetPath,
  resolveSystemPath,
  transformMdxImages,
} from '../image';

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
        const images: string[] = extractImages(doc.body.raw);
        return createBlurMap(doc._raw.sourceFilePath, images);
      },
    },
    body: {
      type: 'mdx',
      resolve: (doc) => transformMdxImages(doc),
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
    r2Folder: { type: 'string', required: false },
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
        const images: string[] = extractImages(doc.body.raw);
        return createBlurMap(doc._raw.sourceFilePath, images);
      },
    },
    coverImage: {
      type: 'string',
      resolve: (doc) => resolveAssetPath(doc._raw.sourceFileDir, doc.coverImage),
    },
    coverImageBlur: {
      type: 'json',
      resolve: async (doc) => {
        try {
          const systemPath = resolveSystemPath(doc._raw.sourceFilePath, doc.coverImage);
          return await createBlurData(systemPath);
        } catch (error) {
          console.error(`Failed to create blur data for cover image: ${doc.coverImage}`, error);
          return { blur: '', ratio: 0 };
        }
      },
    },
    body: {
      type: 'mdx',
      resolve: (doc) => transformMdxImages(doc, doc.r2Folder),
    },
  },
}));

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/**/*.{md,mdx}`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    createdAt: { type: 'date', required: true },
    coverImage: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    repository: { type: 'string', required: false },
    url: { type: 'string', required: false },
    projectDue: { type: 'date', required: false },
    awards: { type: 'string', required: false },
    capabilities: { type: 'list', of: { type: 'string' }, required: false },
    order: { type: 'number', required: false },
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
        const images: string[] = extractImages(doc.body.raw);
        return createBlurMap(doc._raw.sourceFilePath, images);
      },
    },
    coverImage: {
      type: 'string',
      resolve: (doc) => resolveAssetPath(doc._raw.sourceFileDir, doc.coverImage),
    },
    coverImageBlur: {
      type: 'json',
      resolve: async (doc) => {
        try {
          const systemPath = resolveSystemPath(doc._raw.sourceFilePath, doc.coverImage);
          return await createBlurData(systemPath);
        } catch (error) {
          console.error(`Failed to create blur data for cover image: ${doc.coverImage}`, error);
          return { blur: '', ratio: 0 };
        }
      },
    },
    body: {
      type: 'mdx',
      resolve: (doc) => transformMdxImages(doc),
    },
  },
}));

export * from '../image';
