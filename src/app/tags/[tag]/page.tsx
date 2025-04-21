import { allPosts } from '@contentlayer/generated';
import { slugify } from '@semantic/utils';

import TagsPage from './p/[page]/page';

type TagRootPageProps = {
  params: Promise<{ tag: string }>;
};

const TagRootPage = async ({ params }: TagRootPageProps) => {
  const resolvedParams = await params;
  return await TagsPage({ params: Promise.resolve({ ...resolvedParams, page: '1' }) });
};

export default TagRootPage;

export const generateStaticParams = () => {
  const tags = [...new Set(allPosts.flatMap((post) => post.tags || []))];
  return tags.map((tag) => ({ tag: slugify(tag) }));
};
