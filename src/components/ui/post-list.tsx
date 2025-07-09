import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { Post } from '@contentlayer/generated';
import { RelativeTime } from '@semantic/components/ui/index';
import { ROUTES } from '@semantic/constants';

type PostListProps = ComponentProps<'ul'> & {
  className?: string;
  posts: Post[];
};

export const PostList = ({ posts, className, ...props }: PostListProps) => {
  return (
    <ul className={twMerge('column list-none gap-[1.875rem]', className)} {...props} data-animate>
      {posts.map(
        ({ _id, slug, title, subtitle, coverImage, coverImageBlur, category, createdAt }) => (
          <li key={_id}>
            <Link
              href={`${ROUTES.POSTS}/${slug}`}
              aria-label={`Read post: ${title}`}
              className={twMerge(
                'flex flex-col gap-[1.125rem] cursor-pointer tablet:flex-row tablet:gap-[2.1875rem]',
                'hover:[&_.title]:bg-[var(--color-gray-hover)]',
                'hover:[&_.subtitle]:bg-[var(--color-gray-hover)]',
                'hover:[&_.description]:bg-[var(--color-gray-hover)]',
                'active:[&_.title]:bg-[var(--color-border)]',
                'active:[&_.subtitle]:bg-[var(--color-border)]',
                'active:[&_.description]:bg-[var(--color-border)]',
              )}
            >
              <div className="relative w-full aspect-[1.8/1] rounded-[0.875rem] border border-[var(--color-border)] overflow-hidden tablet:w-[21.625rem]">
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

              <div className="column flex-1">
                <h2 className="title post-subtitle px-[0.625rem] py-[0.125rem] mx-[-0.625rem] mb-[-0.125rem] text-[var(--color-gray-accent)] rounded-[0.5rem] transition-colors duration-250 ease-in-out">
                  {title}
                </h2>
                <p className="subtitle post-description px-[0.625rem] py-[0.125rem] mt-[0.75rem] tablet:mt-[1.25rem] mx-[-0.625rem] mb-[-0.125rem] text-[var(--color-gray-mid)] rounded-[0.5rem] transition-colors duration-250 ease-in-out">
                  {subtitle}
                </p>
                <p className="description center-y h5 px-[0.625rem] py-[0.125rem] mt-[0.5rem] tablet:mt-[1.125rem] mx-[-0.625rem] mb-[-0.125rem] text-[var(--color-gray-light)] rounded-[0.5rem] transition-colors duration-250 ease-in-out w-fit">
                  <RelativeTime time={createdAt} />
                  {category && (
                    <>
                      <span className="text-[var(--color-gray-bold)]">&nbsp;&middot;&nbsp;</span>
                      {category}
                    </>
                  )}
                </p>
              </div>
            </Link>
          </li>
        ),
      )}
    </ul>
  );
};
