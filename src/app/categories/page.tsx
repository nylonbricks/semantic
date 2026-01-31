import { getAllPosts } from "@libs/content";
import { ROUTES } from "@semantic/constants";
import { generatePageMetadata, slugify } from "@semantic/utils";
import type { Metadata } from "next";
import Link from "next/link";

const CategoryListPage = async () => {
  const allPosts = await getAllPosts();
  const categories = [...new Set(allPosts.map((post) => post.category))];
  const categoryCounts = categories.reduce(
    (acc, category) => {
      acc[category] = allPosts.filter(
        (post) => post.category === category
      ).length;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <>
      <header className="mx-auto mb-[2.25rem] text-center font-mono">
        <h1 className="post-title mb-[0.75rem] text-[var(--color-gray-accent)]">
          Categories
        </h1>
        <p className="font-medium text-[var(--color-gray-mid)] text-sm">
          Explore all categories.
        </p>
      </header>

      <section className="mx-auto mb-[2.25rem]">
        <nav aria-label="Category list">
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[1rem] p-0">
            {categories.map((category) => (
              <li
                className="rounded-[0.5rem] border border-[var(--color-background03)] bg-[var(--color-background02)] font-mono transition-colors duration-150 hover:bg-[var(--color-background04)]"
                key={category}
              >
                <Link
                  aria-label={`${category} category (${categoryCounts[category]} posts)`}
                  className="row-between gap-[1rem] px-[1.25rem] py-[0.625rem] no-underline"
                  href={`${ROUTES.CATEGORIES}/${slugify(category)}`}
                >
                  <span className="font-medium text-sm">{category}</span>
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
  return generatePageMetadata({ title: "Categories", path: ROUTES.CATEGORIES });
};
