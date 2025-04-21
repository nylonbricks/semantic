import dayjs from 'dayjs';

import { allPosts } from '@contentlayer/generated';
import { Pagination, PostList } from '@semantic/components/ui';
import { POST, ROUTES } from '@semantic/constants';
import { slugify } from '@semantic/utils';

import * as styles from './page.css';

type CategoriesPageProps = {
  params: Promise<{ category: string; page: string }>;
};

const CategoriesPage = async ({ params }: CategoriesPageProps) => {
  const { category, page } = await params;
  const currentPage = parseInt(page || '1', 10);

  const categoryPosts = allPosts.filter((post) => slugify(post.category) === category);
  const start = (currentPage - 1) * POST.PER_PAGE;
  const end = start + POST.PER_PAGE;
  const sortedPosts = categoryPosts.sort((a, b) =>
    dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1,
  );
  const currentPosts = sortedPosts.slice(start, end);

  return (
    <>
      <h1 className={styles.title}>
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
