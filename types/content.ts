import type { BlurData } from "@libs/image";

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

export interface Post extends PostMetadata {
  _id: string;
  slug: string;
  coverImageBlur: BlurData;
}
