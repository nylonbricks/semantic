import { allPosts } from '@contentlayer/generated';

import CategoriesPage from './p/[page]/page';

type CategoryRootProps = {
  params: { category: string };
};

const CategoryRootPage = ({ params }: CategoryRootProps) => {
  return <CategoriesPage params={Promise.resolve({ ...params, page: '1' })} />;
};

export default CategoryRootPage;

export const generateStaticParams = () => {
  const categories = [...new Set(allPosts.map((post) => post.category))];
  return categories.map((category) => ({ category }));
};
