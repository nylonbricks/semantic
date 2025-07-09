import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { type Post } from '@contentlayer/generated';
import { RelativeTime } from '@semantic/components/ui';

type PostGridProps = ComponentProps<'div'> & {
  className?: string;
  posts: Post[];
};

export const PostGrid = ({ posts, className, ...props }: PostGridProps) => {
  return (
    <div
      className={twMerge('grid grid-cols-1 w-full gap-[4.0625rem] tablet:grid-cols-2', className)}
      {...props}
    >
      {posts.map(({ _id, slug, title, coverImage, coverImageBlur, createdAt }) => {
        return (
          <Link
            key={_id}
            href={`/posts/${slug}`}
            className={twMerge(
              'flex flex-col w-full cursor-pointer',
              'hover:[&_.title]:bg-[var(--color-gray-hover)]',
              'hover:[&_.description]:bg-[var(--color-gray-hover)]',
              'active:[&_.title]:bg-[var(--color-border)]',
              'active:[&_.description]:bg-[var(--color-border)]',
            )}
            aria-label={`Read post: ${title}`}
          >
            <div className="relative w-full aspect-[1.8/1] rounded-[0.875rem] border border-[var(--color-border)] overflow-hidden">
              <Image
                className="w-full h-full object-cover object-center"
                src={coverImage}
                alt={`${title} Cover Image`}
                placeholder="blur"
                blurDataURL={coverImageBlur.blur}
                draggable={false}
                priority={false}
                quality={100}
                sizes="100vw"
                fill
              />
            </div>

            <h2 className="title post-subtitle flex overflow-hidden text-ellipsis line-clamp-2 px-[0.625rem] py-[0.125rem] mt-[1rem] mx-[-0.625rem] mb-[-0.125rem] rounded-[0.5rem] transition-colors duration-250 ease-in-out">
              {title}
            </h2>

            <RelativeTime
              className="description h4 text-[var(--color-gray-light)] w-fit px-[0.625rem] py-[0.125rem] mt-[1rem] mx-[-0.625rem] mb-[-0.125rem] rounded-[0.5rem] transition-colors duration-250 ease-in-out"
              time={createdAt}
            />
          </Link>
        );
      })}
    </div>
  );
};
