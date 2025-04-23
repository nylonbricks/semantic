import { type Metadata } from 'next';
import Link from 'next/link';

import { allPosts } from '@contentlayer/generated';
import { ROUTES } from '@semantic/constants';
import { generatePageMetadata, slugify } from '@semantic/utils';

import * as styles from './page.css';

const TagListPage = () => {
  const tags = [...new Set(allPosts.flatMap((post) => post.tags ?? []))];
  const tagCounts = tags.reduce(
    (acc, tag) => {
      acc[tag] = allPosts.filter((post) => (post.tags ?? []).includes(tag)).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Tags</h1>
        <p className={styles.description}>Explore all tags.</p>
      </header>

      <section className={styles.section}>
        <nav aria-label="Tag list">
          <ul className={styles.list}>
            {tags.map((tag) => (
              <li key={tag} className={styles.item}>
                <Link
                  href={`${ROUTES.TAGS}/${slugify(tag)}`}
                  className={styles.link}
                  aria-label={`${tag} tag (${tagCounts[tag]} posts)`}
                >
                  <span className={styles.name}>{tag}</span>
                  <span className={styles.count}>({tagCounts[tag]})</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </>
  );
};

export default TagListPage;

export const generateMetadata = async (): Promise<Metadata> => {
  return generatePageMetadata({ title: 'Tags', path: ROUTES.TAGS });
};
