import { promises as fs } from 'node:fs';
import path from 'node:path';

import type { Post, PostMetadata } from '@/types/content';

import { createBlurData } from '../image';

const MDX_EXTENSION_REGEX = /\.mdx$/;

const POSTS_ARTICLES_DIR = path.join(process.cwd(), 'src', 'app', 'posts', '_articles');
const CONTENT_DIR = path.join(process.cwd(), 'content');

type PostModule = {
  default: unknown;
  metadata?: PostMetadata;
};

const toSystemContentPath = (webPath: string) => {
  if (!webPath.startsWith('/content/')) {
    throw new Error(`Unsupported content webPath: ${webPath}`);
  }
  return path.join(CONTENT_DIR, webPath.replace(/^\/content\//, ''));
};

const createPostFromMetadata = async (slug: string, metadata: PostMetadata): Promise<Post> => {
  let coverImageBlur = { blur: '', ratio: 0 };

  try {
    coverImageBlur = await createBlurData(toSystemContentPath(metadata.coverImage));
  } catch (error) {
    console.error(`Failed to create cover blur: ${slug}`, error);
  }

  return {
    _id: slug,
    slug,
    ...metadata,
    coverImageBlur,
  };
};

export const getAllPosts = async (): Promise<Post[]> => {
  const articles = await fs.readdir(POSTS_ARTICLES_DIR);

  const items: Post[] = [];
  for (const article of articles) {
    if (!article.endsWith('.mdx')) continue;

    const postModule = (await import(`@semantic/app/posts/_articles/${article}`)) as PostModule;
    if (!postModule.metadata) {
      throw new Error(`Missing \`metadata\` in ${article}`);
    }

    const slug = article.replace(MDX_EXTENSION_REGEX, '');
    items.push(await createPostFromMetadata(slug, postModule.metadata));
  }

  items.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
  return items;
};

export const getPostBySlug = async (slug: string): Promise<Post> => {
  try {
    const postModule = (await import(`@semantic/app/posts/_articles/${slug}.mdx`)) as PostModule;

    if (!postModule.metadata) {
      throw new Error(`Missing \`metadata\` in ${slug}.mdx`);
    }

    return await createPostFromMetadata(slug, postModule.metadata);
  } catch (error) {
    console.error(`Failed to load post: ${slug}`, error);
    throw new Error(`Post not found: ${slug}`);
  }
};

export type { Post, PostMetadata };
