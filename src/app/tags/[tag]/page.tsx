import { type Metadata } from 'next';

import { allPosts } from '@contentlayer/generated';
import { ROUTES } from '@semantic/constants';
import { generatePageMetadata, slugify } from '@semantic/utils';

import TagsPage from './p/[page]/page';

export default TagsPage;

export const generateStaticParams = () => {
  const tags = [...new Set(allPosts.flatMap((post) => post.tags || []))];
  return tags.map((tag) => ({ tag: slugify(tag) }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> => {
  const { tag } = await params;
  const tagPosts = allPosts.filter((post) => post.tags?.some((t) => slugify(t) === tag));
  const tagName = tagPosts[0]?.tags?.find((t) => slugify(t) === tag) ?? tag;

  return generatePageMetadata({ title: tagName, path: `${ROUTES.TAGS}/${tag}` });
};
