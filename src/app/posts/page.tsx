import { getAllPosts } from "@libs/content";
import { Pagination, PostList } from "@semantic/components/ui";
import { POST, ROUTES } from "@semantic/constants";
import { generatePageMetadata } from "@semantic/utils";
import type { Metadata } from "next";

interface PostsPageProps {
  searchParams: Promise<{ page: string }>;
}

const parsePageParam = (raw: string | undefined) => {
  const page = Number.parseInt(raw ?? "1", 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
};

const PostsPage = async ({ searchParams }: PostsPageProps) => {
  const { page } = await searchParams;
  const currentPage = parsePageParam(page);
  const start = (currentPage - 1) * POST.PER_PAGE;
  const end = start + POST.PER_PAGE;

  const allPosts = await getAllPosts();
  const sortedPosts = [...allPosts].sort((a, b) =>
    a.createdAt > b.createdAt ? -1 : 1
  );

  const currentPosts = sortedPosts.slice(start, end);

  return (
    <>
      <h1 className="h3 mb-[1.875rem] text-[var(--color-gray-light)]">
        Posts ({allPosts.length})
      </h1>

      <PostList posts={currentPosts} />

      <Pagination
        basePath={ROUTES.POSTS}
        currentPage={currentPage}
        totalPages={Math.ceil(allPosts.length / POST.PER_PAGE)}
      />
    </>
  );
};

export default PostsPage;

export const generateStaticParams = async () => {
  const allPosts = await getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POST.PER_PAGE);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
};

export const generateMetadata = async ({
  searchParams,
}: PostsPageProps): Promise<Metadata> => {
  const { page } = await searchParams;
  const current = parsePageParam(page);

  return generatePageMetadata({
    title: current === 1 ? "Posts" : `Posts - Page ${current}`,
    path: current === 1 ? ROUTES.POSTS : `${ROUTES.POSTS}/p/${current}`,
  });
};
