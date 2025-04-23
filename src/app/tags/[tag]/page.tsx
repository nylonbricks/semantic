import { allPosts } from '@contentlayer/generated';
import { slugify } from '@semantic/utils';

import TagsPage from './p/[page]/page';

export default TagsPage;

export const generateStaticParams = () => {
  const tags = [...new Set(allPosts.flatMap((post) => post.tags || []))];
  return tags.map((tag) => ({ tag: slugify(tag) }));
};
