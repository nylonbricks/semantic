import dayjs from 'dayjs';

import { allPosts } from '@contentlayer/generated';
import { Pagination, PostList } from '@semantic/components/ui';
import { POST, ROUTES } from '@semantic/constants';

import * as styles from './page.css';

type PostsPageProps = {
  params: Promise<{ page: string }>;
};

const PostsPage = async ({ params }: PostsPageProps) => {
  const { page } = await params;
  const currentPage = parseInt(page || '1', 10);
  const start = (currentPage - 1) * POST.PER_PAGE;
  const end = start + POST.PER_PAGE;
  const sortedPosts = allPosts.sort((a, b) => (dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1));
  const currentPosts = sortedPosts.slice(start, end);

  return (
    <>
      <h1 className={styles.title}>Posts ({allPosts.length})</h1>
      <PostList posts={currentPosts} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(allPosts.length / POST.PER_PAGE)}
        basePath={`${ROUTES.POSTS}/p`}
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
