import { ROUTES } from "@semantic/constants";
import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import type { Post } from "@/types/content";

import { RelativeTime } from "./relative-time";

type PostListProps = ComponentProps<"ul"> & {
  className?: string;
  posts: Post[];
};

export const PostList = ({ posts, className, ...props }: PostListProps) => {
  return (
    <ul
      className={twMerge("column list-none gap-[1.875rem]", className)}
      {...props}
    >
      {posts.map(
        ({
          _id,
          slug,
          title,
          subtitle,
          coverImage,
          coverImageBlur,
          category,
          createdAt,
        }) => (
          <li key={_id}>
            <Link
              aria-label={`Read post: ${title}`}
              className={twMerge(
                "flex cursor-pointer tablet:flex-row flex-col gap-[1.125rem] tablet:gap-[2.1875rem]",
                "hover:[&_.title]:bg-[var(--color-gray-hover)]",
                "hover:[&_.subtitle]:bg-[var(--color-gray-hover)]",
                "hover:[&_.description]:bg-[var(--color-gray-hover)]",
                "active:[&_.title]:bg-[var(--color-border)]",
                "active:[&_.subtitle]:bg-[var(--color-border)]",
                "active:[&_.description]:bg-[var(--color-border)]"
              )}
              href={`${ROUTES.POSTS}/${slug}`}
            >
              <div className="relative aspect-[1.8/1] tablet:w-[21.625rem] w-full overflow-hidden rounded-[0.875rem] border border-[var(--color-border)]">
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

              <div className="column flex-1">
                <h2 className="title post-subtitle mx-[-0.625rem] mb-[-0.125rem] rounded-[0.5rem] px-[0.625rem] py-[0.125rem] text-[var(--color-gray-accent)] transition-colors duration-250 ease-in-out">
                  {title}
                </h2>
                <p className="subtitle post-description mx-[-0.625rem] mt-[0.75rem] tablet:mt-[1.25rem] mb-[-0.125rem] rounded-[0.5rem] px-[0.625rem] py-[0.125rem] text-[var(--color-gray-mid)] transition-colors duration-250 ease-in-out">
                  {subtitle}
                </p>
                <p className="description center-y h5 mx-[-0.625rem] mt-[0.5rem] tablet:mt-[1.125rem] mb-[-0.125rem] w-fit rounded-[0.5rem] px-[0.625rem] py-[0.125rem] text-[var(--color-gray-light)] transition-colors duration-250 ease-in-out">
                  <RelativeTime time={createdAt} />
                  {category && (
                    <>
                      <span className="text-[var(--color-gray-bold)]">
                        &nbsp;&middot;&nbsp;
                      </span>
                      {category}
                    </>
                  )}
                </p>
              </div>
            </Link>
          </li>
        )
      )}
    </ul>
  );
};
