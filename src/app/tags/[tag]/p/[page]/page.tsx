import dayjs from 'dayjs';

import { allPosts } from '@contentlayer/generated';
import { Pagination, PostList } from '@semantic/components/ui';
import { POST, ROUTES } from '@semantic/constants';

import * as styles from './page.css';

type TagsPageProps = {
  params: Promise<{ tag: string; page: string }>;
};

const TagsPage = async ({ params }: TagsPageProps) => {
  const { tag, page } = await params;
  const currentPage = parseInt(page || '1', 10);
  
  const tagPosts = allPosts.filter((post) => post.tags?.includes(tag));
  const start = (currentPage - 1) * POST.PER_PAGE;
  const end = start + POST.PER_PAGE;
  const sortedPosts = tagPosts.sort((a, b) => (dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1));
  const currentPosts = sortedPosts.slice(start, end);

  return (
    <>
      <h1 className={styles.title}>{tag} ({tagPosts.length})</h1>
      <PostList posts={currentPosts} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(tagPosts.length / POST.PER_PAGE)}
        basePath={`${ROUTES.TAGS}/${tag}/p`}
      />
    </>
  );
};

export default TagsPage;

export const generateStaticParams = () => {
  const tags = [...new Set(allPosts.flatMap((post) => post.tags || []))];
  
  return tags.flatMap((tag) => {
    const tagPosts = allPosts.filter((post) => post.tags?.includes(tag));
    const totalPages = Math.ceil(tagPosts.length / POST.PER_PAGE);
    
    return Array.from({ length: totalPages }, (_, i) => ({
      tag,
      page: (i + 1).toString(),
    }));
  });
}; 