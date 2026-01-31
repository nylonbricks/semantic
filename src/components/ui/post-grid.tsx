import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import type { Post } from "@/types/content";

import { RelativeTime } from "./relative-time";

type PostGridProps = ComponentProps<"div"> & {
  className?: string;
  posts: Post[];
};

export const PostGrid = ({ posts, className, ...props }: PostGridProps) => {
  return (
    <div
      className={twMerge(
        "grid w-full grid-cols-1 tablet:grid-cols-2 gap-[4.0625rem]",
        className
      )}
      {...props}
    >
      {posts.map(
        ({ _id, slug, title, coverImage, coverImageBlur, createdAt }) => {
          return (
            <Link
              aria-label={`Read post: ${title}`}
              className={twMerge(
                "flex w-full cursor-pointer flex-col",
                "hover:[&_.title]:bg-[var(--color-gray-hover)]",
                "hover:[&_.description]:bg-[var(--color-gray-hover)]",
                "active:[&_.title]:bg-[var(--color-border)]",
                "active:[&_.description]:bg-[var(--color-border)]"
              )}
              href={`/posts/${slug}`}
              key={_id}
            >
              <div className="relative aspect-[1.8/1] w-full overflow-hidden rounded-[0.875rem] border border-[var(--color-border)]">
                <Image
                  alt={`${title} Cover Image`}
                  blurDataURL={coverImageBlur.blur}
                  className="h-full w-full object-cover object-center"
                  draggable={false}
                  fill
                  placeholder="blur"
                  priority={false}
                  quality={100}
                  sizes="100vw"
                  src={coverImage}
                />
              </div>

              <h2 className="title post-subtitle mx-[-0.625rem] mt-[1rem] mb-[-0.125rem] line-clamp-2 flex overflow-hidden text-ellipsis rounded-[0.5rem] px-[0.625rem] py-[0.125rem] transition-colors duration-250 ease-in-out">
                {title}
              </h2>

              <RelativeTime
                className="description h4 mx-[-0.625rem] mt-[1rem] mb-[-0.125rem] w-fit rounded-[0.5rem] px-[0.625rem] py-[0.125rem] text-[var(--color-gray-light)] transition-colors duration-250 ease-in-out"
                time={createdAt}
              />
            </Link>
          );
        }
      )}
    </div>
  );
};
