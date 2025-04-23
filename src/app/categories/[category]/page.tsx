import { type Metadata } from 'next';

import { allPosts } from '@contentlayer/generated';
import { ROUTES } from '@semantic/constants';
import { generatePageMetadata, slugify } from '@semantic/utils';

import CategoriesPage from './p/[page]/page';

export default CategoriesPage;

export const generateStaticParams = () => {
  const categories = [...new Set(allPosts.map((post) => post.category))];
  return categories.map((category) => ({ category: slugify(category) }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> => {
  const { category } = await params;
  const categoryPosts = allPosts.filter((post) => slugify(post.category) === category);
  const categoryName = categoryPosts[0]?.category ?? category;

  return generatePageMetadata({
    title: categoryName,
    path: `${ROUTES.CATEGORIES}/${category}`,
  });
};
