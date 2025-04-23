import { type Metadata } from 'next';
import Link from 'next/link';

import { allPosts } from '@contentlayer/generated';
import { ROUTES } from '@semantic/constants';
import { generatePageMetadata, slugify } from '@semantic/utils';

import * as styles from './page.css';

const CategoryListPage = () => {
  const categories = [...new Set(allPosts.map((post) => post.category))];
  const categoryCounts = categories.reduce(
    (acc, category) => {
      acc[category] = allPosts.filter((post) => post.category === category).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Categories</h1>
        <p className={styles.description}>Explore all categories.</p>
      </header>

      <section className={styles.section}>
        <nav aria-label="Category list">
          <ul className={styles.list}>
            {categories.map((category) => (
              <li key={category} className={styles.item}>
                <Link
                  href={`${ROUTES.CATEGORIES}/${slugify(category)}`}
                  className={styles.link}
                  aria-label={`${category} category (${categoryCounts[category]} posts)`}
                >
                  <span className={styles.name}>{category}</span>
                  <span className={styles.count}>({categoryCounts[category]})</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </>
  );
};

export default CategoryListPage;

export const generateMetadata = async (): Promise<Metadata> => {
  return generatePageMetadata({ title: 'Categories', path: ROUTES.CATEGORIES });
};
