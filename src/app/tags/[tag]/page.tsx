import { allPosts } from '@contentlayer/generated';

import TagsPage from './p/[page]/page';

type TagRootPageProps = {
  params: { tag: string };
};

const TagRootPage = ({ params }: TagRootPageProps) => {
  return <TagsPage params={Promise.resolve({ ...params, page: '1' })} />;
};

export default TagRootPage;

export const generateStaticParams = () => {
  const tags = [...new Set(allPosts.flatMap((post) => post.tags || []))];
  return tags.map((tag) => ({ tag }));
}; 