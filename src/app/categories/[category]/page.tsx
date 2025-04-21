import { allPosts } from '@contentlayer/generated';
import { slugify } from '@semantic/utils';

import CategoriesPage from './p/[page]/page';

type CategoryRootProps = {
  params: Promise<{ category: string }>;
};

const CategoryRootPage = async ({ params }: CategoryRootProps) => {
  const resolvedParams = await params;
  return await CategoriesPage({ params: Promise.resolve({ ...resolvedParams, page: '1' }) });
};

export default CategoryRootPage;

export const generateStaticParams = () => {
  const categories = [...new Set(allPosts.map((post) => post.category))];
  return categories.map((category) => ({ category: slugify(category) }));
};
