import dayjs from 'dayjs';
import { type Metadata } from 'next';

import { allPosts } from '@contentlayer/generated';
import { Pagination, PostList } from '@semantic/components/ui';
import { POST, ROUTES } from '@semantic/constants';
import { generatePageMetadata, slugify } from '@semantic/utils';

type CategoriesPageProps = {
  params: Promise<{ category: string; page: string }>;
};

const CategoriesPage = async ({ params }: CategoriesPageProps) => {
  const { category, page } = await params;
  const currentPage = parseInt(page || '1', 10);

  const categoryPosts = allPosts.filter((post) => slugify(post.category) === category);

  const sortedPosts = categoryPosts.sort((a, b) =>
    dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1,
  );

  const start = (currentPage - 1) * POST.PER_PAGE;
  const end = start + POST.PER_PAGE;
  const currentPosts = sortedPosts.slice(start, end);

  return (
    <>
      <h1 className="h3 mb-[1.875rem] text-[var(--color-gray-light)]">
        {categoryPosts.length > 0
          ? `${categoryPosts[0].category} (${categoryPosts.length})`
          : `${category} (0 posts)`}
      </h1>

      <PostList posts={currentPosts} />

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(categoryPosts.length / POST.PER_PAGE)}
        basePath={`${ROUTES.CATEGORIES}/${category}/p`}
      />
    </>
  );
};

export default CategoriesPage;

export const generateStaticParams = () => {
  const categories = [...new Set(allPosts.map((post) => post.category))];

  return categories.flatMap((category) => {
    const categoryPosts = allPosts.filter((post) => post.category === category);
    const totalPages = Math.ceil(categoryPosts.length / POST.PER_PAGE);

    return Array.from({ length: totalPages }, (_, i) => ({
      category: slugify(category),
      page: (i + 1).toString(),
    }));
  });
};

export const generateMetadata = async ({ params }: CategoriesPageProps): Promise<Metadata> => {
  const { category, page } = await params;
  const current = parseInt(page || '1', 10);
  const categoryPosts = allPosts.filter((post) => slugify(post.category) === category);
  const categoryName = categoryPosts[0]?.category ?? category;

  return generatePageMetadata({
    title: categoryName,
    path:
      current === 1
        ? `${ROUTES.CATEGORIES}/${category}`
        : `${ROUTES.CATEGORIES}/${category}/p/${current}`,
  });
};
