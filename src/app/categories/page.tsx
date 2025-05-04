import { type Metadata } from 'next';
import Link from 'next/link';

import { allPosts } from '@contentlayer/generated';
import { ROUTES } from '@semantic/constants';
import { generatePageMetadata, slugify } from '@semantic/utils';

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
      <header className="mx-auto mb-[2.25rem] text-center font-mono">
        <h1 className="post-title mb-[0.75rem] text-[var(--color-gray-accent)]">Categories</h1>
        <p className="text-[var(--color-gray-mid)] text-sm font-medium">Explore all categories.</p>
      </header>

      <section className="mb-[2.25rem] mx-auto">
        <nav aria-label="Category list">
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] p-0 m-0 list-none gap-[1rem]">
            {categories.map((category) => (
              <li
                key={category}
                className="font-mono border border-[var(--color-background03)] rounded-[0.5rem] bg-[var(--color-background02)] hover:bg-[var(--color-background04)] transition-colors duration-150"
              >
                <Link
                  href={`${ROUTES.CATEGORIES}/${slugify(category)}`}
                  aria-label={`${category} category (${categoryCounts[category]} posts)`}
                  className="row-between py-[0.625rem] px-[1.25rem] no-underline gap-[1rem]"
                >
                  <span className="text-sm font-medium">{category}</span>
                  <span className="text-[var(--color-gray-mid)] text-xs">
                    ({categoryCounts[category]})
                  </span>
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
