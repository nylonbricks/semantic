import { readdir } from "node:fs/promises";
import path from "node:path";

import type { Post, PostCoverImage, PostMetadata } from "@/types/content";

export type { Post, PostMetadata } from "@/types/content";

const MDX_EXTENSION = ".mdx";
const POSTS_DIR = path.join(process.cwd(), "src", "app", "posts", "_articles");

interface PostModule {
  default: unknown;
  metadata?: PostMetadata;
}

const resolveCoverImage = async (
  coverImage: string
): Promise<PostCoverImage> => {
  if (coverImage.startsWith("https://")) {
    return coverImage;
  }

  try {
    const image = await import(`../../../assets/images/${coverImage}`);
    return image.default;
  } catch (error) {
    console.error(`Failed to load local image: ${coverImage}`, error);
    return coverImage;
  }
};

const buildPost = async (
  slug: string,
  metadata: PostMetadata
): Promise<Post> => {
  const coverImage = await resolveCoverImage(metadata.coverImage);
  return {
    _id: slug,
    slug,
    ...metadata,
    coverImage,
  };
};

export const getAllPosts = async (): Promise<Post[]> => {
  const entries = await readdir(POSTS_DIR);

  const items: Post[] = [];
  for (const filename of entries) {
    if (!filename.endsWith(MDX_EXTENSION)) {
      continue;
    }

    const postModule = (await import(
      `@semantic/app/posts/_articles/${filename}`
    )) as PostModule;
    if (!postModule.metadata) {
      throw new Error(`Missing \`metadata\` in ${filename}`);
    }

    const slug = filename.slice(0, -MDX_EXTENSION.length);
    items.push(await buildPost(slug, postModule.metadata));
  }

  items.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
  return items;
};

export const getPostBySlug = async (slug: string): Promise<Post> => {
  try {
    const postModule = (await import(
      `@semantic/app/posts/_articles/${slug}.mdx`
    )) as PostModule;

    if (!postModule.metadata) {
      throw new Error(`Missing \`metadata\` in ${slug}.mdx`);
    }

    return await buildPost(slug, postModule.metadata);
  } catch (error) {
    console.error(`Failed to load post: ${slug}`, error);
    throw new Error(`Post not found: ${slug}`);
  }
};
