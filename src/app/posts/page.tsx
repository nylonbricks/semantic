import dayjs from 'dayjs';
import { type Metadata } from 'next';

import { allPosts } from '@contentlayer/generated';
import { Pagination, PostList } from '@semantic/components/ui';
import { POST, ROUTES } from '@semantic/constants';
import { generatePageMetadata } from '@semantic/utils';

type PostsPageProps = {
  searchParams: Promise<{ page: string }>;
};

const PostsPage = async ({ searchParams }: PostsPageProps) => {
  const { page } = await searchParams;
  const currentPage = parseInt(page || '1', 10);
  const start = (currentPage - 1) * POST.PER_PAGE;
  const end = start + POST.PER_PAGE;

  const sortedPosts = allPosts.sort((a, b) =>
    dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1,
  );

  const currentPosts = sortedPosts.slice(start, end);

  return (
    <>
      <h1 className="h3 mb-[1.875rem] text-[var(--color-gray-light)]">Posts ({allPosts.length})</h1>

      <PostList posts={currentPosts} />

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(allPosts.length / POST.PER_PAGE)}
        basePath={ROUTES.POSTS}
      />
    </>
  );
};

export default PostsPage;

export const generateStaticParams = () => {
  const totalPages = Math.ceil(allPosts.length / POST.PER_PAGE);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
};

export const generateMetadata = async ({ searchParams }: PostsPageProps): Promise<Metadata> => {
  const { page } = await searchParams;
  const current = parseInt(page || '1', 10);

  return generatePageMetadata({
    title: current === 1 ? 'Posts' : `Posts - Page ${current}`,
    path: current === 1 ? ROUTES.POSTS : `${ROUTES.POSTS}/p/${current}`,
  });
};
