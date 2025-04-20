import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';

import { Post } from '@contentlayer/generated';
import { RelativeTime } from '@semantic/components/ui';
import { ROUTES } from '@semantic/constants';

import * as styles from './page.css';

type PostListProps = ComponentProps<'ul'> & {
  className?: string;
  posts: Post[];
};

export const PostList = ({ posts, className, ...props }: PostListProps) => {
  return (
    <ul className={clsx(styles.list, className)} {...props} data-animate={true}>
      {posts.map(({ _id, slug, title, subtitle, coverImage, coverBlur, category, createdAt }) => {
        return (
          <li key={_id}>
            <Link className={styles.item} href={`${ROUTES.POSTS}/${slug}`}>
              <div className={styles.cover}>
                <Image
                  src={coverImage}
                  alt={`${title} Cover Image`}
                  blurDataURL={coverBlur}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  draggable={false}
                  quality={100}
                  priority={false}
                  fill
                />
              </div>
              <div className={styles.frontmatter}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.subtitle}>{subtitle}</p>
                <p className={styles.description}>
                  <RelativeTime time={createdAt} />
                  {category && (
                    <>
                      <span className={styles.middot}>&nbsp;&middot;&nbsp;</span>
                      {category}
                    </>
                  )}
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
