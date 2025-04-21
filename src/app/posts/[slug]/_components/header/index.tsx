import Image from 'next/image';
import Link from 'next/link';

import { Post } from '@contentlayer/generated';
import { RelativeTime } from '@semantic/components/ui';
import { ROUTES } from '@semantic/constants';
import { slugify } from '@semantic/utils';

import * as styles from './styles.css';

export const Header = ({
  coverImage,
  coverBlur,
  title,
  subtitle,
  createdAt,
  category,
  tags,
}: Post) => {
  return (
    <header className={styles.root}>
      <div className={styles.cover}>
        <Image
          src={coverImage}
          alt={`${title} Cover Image`}
          sizes="(max-width: 768px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL={coverBlur}
          draggable={false}
          quality={100}
          priority={false}
          fill
        />
      </div>
      <h1 className={styles.title}>{title}</h1>
      <h2 className={styles.subtitle}>{subtitle}</h2>
      <p className={styles.description}>
        <RelativeTime time={createdAt} />
        {category && (
          <>
            <span className={styles.middot}>&nbsp;&middot;&nbsp;</span>
            <Link href={`/categories/${slugify(category)}`}>{category}</Link>
          </>
        )}
      </p>
      <ul className={styles.tags}>
        {tags?.map((tag) => (
          <li key={tag} className={styles.tag}>
            <Link href={`${ROUTES.TAGS}/${slugify(tag)}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
};
