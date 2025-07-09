import dayjs from 'dayjs';
import { type Metadata } from 'next';

import { allPosts } from '@contentlayer/generated';
import { Pagination, PostList } from '@semantic/components/ui';
import { POST, ROUTES } from '@semantic/constants';
import { generatePageMetadata, slugify } from '@semantic/utils';

type TagsPageProps = {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page: string }>;
};

const TagsPage = async ({ params, searchParams }: TagsPageProps) => {
  const { tag } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page || '1', 10);

  const tagPosts = allPosts.filter((post) => post.tags?.some((t) => slugify(t) === tag));

  const sortedPosts = tagPosts.sort((a, b) =>
    dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1,
  );

  const start = (currentPage - 1) * POST.PER_PAGE;
  const end = start + POST.PER_PAGE;
  const currentPosts = sortedPosts.slice(start, end);

  const tagName = tagPosts[0]?.tags?.find((t) => slugify(t) === tag) ?? tag;

  return (
    <>
      <h1 className="h3 mb-[1.875rem] text-[var(--color-gray-light)]">
        {tagName} ({tagPosts.length})
      </h1>
      <PostList posts={currentPosts} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(tagPosts.length / POST.PER_PAGE)}
        basePath={`${ROUTES.TAGS}/${tag}`}
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
      tag: slugify(tag),
      page: (i + 1).toString(),
    }));
  });
};

export const generateMetadata = async ({
  params,
  searchParams,
}: TagsPageProps): Promise<Metadata> => {
  const { tag } = await params;
  const { page } = await searchParams;
  const current = parseInt(page || '1', 10);

  const tagPosts = allPosts.filter((post) => post.tags?.some((t) => slugify(t) === tag));

  const tagName = tagPosts[0]?.tags?.find((t) => slugify(t) === tag) ?? tag;

  return generatePageMetadata({
    title: current === 1 ? tagName : `${tagName} - Page ${current}`,
    path: current === 1 ? `${ROUTES.TAGS}/${tag}` : `${ROUTES.TAGS}/${tag}?page=${current}`,
  });
};
