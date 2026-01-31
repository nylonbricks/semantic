import { getAllPosts } from "@libs/content";
import { ROUTES } from "@semantic/constants/menu";
import { generatePageMetadata } from "@semantic/utils/metadata-util";
import { slugify } from "@semantic/utils/text-util";
import type { Metadata } from "next";
import Link from "next/link";

const TagListPage = async () => {
  const allPosts = await getAllPosts();
  const tags = [...new Set(allPosts.flatMap((post) => post.tags ?? []))];

  const tagCounts = tags.reduce(
    (acc, tag) => {
      acc[tag] = allPosts.filter((post) =>
        (post.tags ?? []).includes(tag)
      ).length;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <>
      <header className="mx-auto mb-[2.25rem] text-center font-mono">
        <h1 className="post-title mb-[0.75rem] text-[var(--color-gray-accent)]">
          Tags
        </h1>
        <p className="font-medium text-[var(--color-gray-mid)] text-sm">
          Explore all tags.
        </p>
      </header>

      <section
        aria-labelledby="tag-list-heading"
        className="mx-auto mb-[2.25rem]"
      >
        <h2 className="sr-only" id="tag-list-heading">
          Tag list
        </h2>
        <nav aria-label="Tag list">
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[1rem] p-0">
            {tags.map((tag) => (
              <li
                className="rounded-[0.5rem] border border-[var(--color-background03)] bg-[var(--color-background02)] font-mono transition-colors duration-150 ease-in-out hover:bg-[var(--color-background04)]"
                key={tag}
              >
                <Link
                  aria-label={`${tag} tag (${tagCounts[tag]} posts)`}
                  className="row-between gap-[1rem] px-[1.25rem] py-[0.625rem] text-[var(--color-gray-accent)] no-underline"
                  href={`${ROUTES.TAGS}/${slugify(tag)}`}
                >
                  <span className="font-medium text-sm">{tag}</span>
                  <span className="text-[var(--color-gray-mid)] text-xs">
                    ({tagCounts[tag]})
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

export default TagListPage;

export const generateMetadata = async (): Promise<Metadata> => {
  return generatePageMetadata({ title: "Tags", path: ROUTES.TAGS });
};
