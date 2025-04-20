import Image from 'next/image';
import Link from 'next/link';

import { Post } from '@contentlayer/generated';
import { RelativeTime } from '@semantic/components/ui';

import * as styles from './styles.css';

export const Header = ({ coverImage, title, subtitle, createdAt, category }: Post) => {
  return (
    <header className={styles.root}>
      <div className={styles.cover}>
        <Image src={coverImage} alt={`${title} Cover Image`} fill />
      </div>
      <h1 className={styles.title}>{title}</h1>
      <h2 className={styles.subtitle}>{subtitle}</h2>
      <p className={styles.description}>
        <RelativeTime time={createdAt} />
        {category && (
          <>
            <span className={styles.middot}>&nbsp;&middot;&nbsp;</span>
            <Link href={`/categories/${category}`}>{category}</Link>
          </>
        )}
      </p>
    </header>
  );
};
