import type { StaticImageData } from "next/image";

export interface PostMetadata {
  category: string;
  comments?: boolean;
  coverImage: string;
  createdAt: string;
  modifiedAt: string;
  subtitle: string;
  tags?: string[];
  title: string;
}

export type PostCoverImage = string | StaticImageData;

export interface Post extends Omit<PostMetadata, "coverImage"> {
  _id: string;
  coverImage: PostCoverImage;
  slug: string;
}
