import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';

import { type Post } from '@contentlayer/generated';

import * as styles from './styles.css';

type PostGridProps = ComponentProps<'div'> & {
  className?: string;
  posts: Post[];
};

export const PostGrid = ({ posts, className, ...props }: PostGridProps) => {
  return (
    <div className={clsx(styles.grid, className)} {...props}>
      {posts.map(({ _id, slug, title, coverImage, coverBlur, createdAt }) => {
        return (
          <Link key={_id} className={styles.container} href={`/posts/${slug}`}>
            <div className={styles.cover}>
              <Image
                src={coverImage}
                alt={`${title} Cover Image`}
                blurDataURL={coverBlur}
                draggable={false}
                fill
              />
            </div>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{createdAt}</p>
          </Link>
        );
      })}
    </div>
  );
};
