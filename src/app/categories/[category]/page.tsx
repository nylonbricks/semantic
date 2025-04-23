import { allPosts } from '@contentlayer/generated';
import { slugify } from '@semantic/utils';

import CategoriesPage from './p/[page]/page';

export default CategoriesPage;

export const generateStaticParams = () => {
  const categories = [...new Set(allPosts.map((post) => post.category))];
  return categories.map((category) => ({ category: slugify(category) }));
};
