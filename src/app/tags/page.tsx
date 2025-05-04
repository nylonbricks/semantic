import { type Metadata } from 'next';
import Link from 'next/link';

import { allPosts } from '@contentlayer/generated';
import { ROUTES } from '@semantic/constants';
import { generatePageMetadata, slugify } from '@semantic/utils';

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
      <header className="mx-auto mb-[2.25rem] text-center font-mono">
        <h1 className="post-title mb-[0.75rem] text-[var(--color-gray-accent)]">Tags</h1>
        <p className="text-[var(--color-gray-mid)] text-sm font-medium">Explore all tags.</p>
      </header>

      <section className="mb-[2.25rem] mx-auto" aria-labelledby="tag-list-heading">
        <h2 id="tag-list-heading" className="sr-only">
          Tag list
        </h2>
        <nav aria-label="Tag list">
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] p-0 m-0 gap-[1rem] list-none">
            {tags.map((tag) => (
              <li
                key={tag}
                className="font-mono border border-[var(--color-background03)] rounded-[0.5rem] bg-[var(--color-background02)] transition-colors duration-150 ease-in-out hover:bg-[var(--color-background04)]"
              >
                <Link
                  href={`${ROUTES.TAGS}/${slugify(tag)}`}
                  className="row-between py-[0.625rem] px-[1.25rem] text-[var(--color-gray-accent)] no-underline gap-[1rem]"
                  aria-label={`${tag} tag (${tagCounts[tag]} posts)`}
                >
                  <span className="text-sm font-medium">{tag}</span>
                  <span className="text-[var(--color-gray-mid)] text-xs">({tagCounts[tag]})</span>
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
