import type { StaticImageData } from "next/image";

export interface PostMetadata {
  title: string;
  subtitle: string;
  createdAt: string;
  modifiedAt: string;
  coverImage: string;
  category: string;
  tags?: string[];
  comments?: boolean;
}

export type PostCoverImage = string | StaticImageData;

export interface Post extends Omit<PostMetadata, "coverImage"> {
  _id: string;
  slug: string;
  coverImage: PostCoverImage;
}
