import { readdir } from "node:fs/promises";
import path from "node:path";

import type { Post, PostCoverImage, PostMetadata } from "@/types/content";

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
    const image = await import(`../../assets/images/${coverImage}`);
    return image.default;
  } catch {
    // Error is handled by falling back to the original coverImage string
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

  const items = await Promise.all(
    entries
      .filter((filename) => filename.endsWith(MDX_EXTENSION))
      .map(async (filename) => {
        const postModule = (await import(
          `@semantic/app/posts/_articles/${filename}`
        )) as PostModule;
        if (!postModule.metadata) {
          throw new Error(`Missing \`metadata\` in ${filename}`);
        }

        const slug = filename.slice(0, -MDX_EXTENSION.length);
        return buildPost(slug, postModule.metadata);
      })
  );

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
    throw new Error(`Post not found: ${slug}`, { cause: error });
  }
};
