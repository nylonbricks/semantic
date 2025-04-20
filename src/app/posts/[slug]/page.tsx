import { notFound } from 'next/navigation';

import { allPosts, Post } from '@contentlayer/generated';
import { Divider, MdxComponent } from '@semantic/components/ui';

import { BackButton } from './_components/back-button';
import { Footer } from './_components/footer';
import { Header } from './_components/header';
import { Recommend } from './_components/recommend';
import * as styles from './page.css';

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

const getPostsInRange = (posts: Post[], start: number, end: number) =>
  posts.slice(Math.max(0, start), Math.min(posts.length, end));

const getRecommendedPosts = (posts: Post[], slug: string) => {
  const sortedPosts = posts.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
  const currentIndex = sortedPosts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) return sortedPosts.slice(0, 4);

  const prevPosts = getPostsInRange(sortedPosts, currentIndex - 2, currentIndex).reverse();
  const nextPosts = getPostsInRange(sortedPosts, currentIndex + 1, currentIndex + 3);

  const recommendedPosts = [...prevPosts, ...nextPosts];

  if (recommendedPosts.length < 4) {
    const remainingCount = 4 - recommendedPosts.length;
    const isFrontHalf = currentIndex < sortedPosts.length / 2;
    const additionalPosts = isFrontHalf
      ? getPostsInRange(sortedPosts, currentIndex + 3, currentIndex + 3 + remainingCount)
      : getPostsInRange(sortedPosts, currentIndex - 2 - remainingCount, currentIndex - 2).reverse();

    recommendedPosts.push(...additionalPosts);
  }

  return recommendedPosts;
};

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

const PostPage = async ({ params }: PostPageProps) => {
  const { slug } = await params;
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) notFound();

  return (
    <>
      <BackButton />

      <article>
        <Header {...post} />
        <MdxComponent code={post.body.code} blurDataURLs={post.blurMap} />
        <Divider className={styles.divider} />
        <Footer {...post} />
      </article>

      <Divider className={styles.divider} />
      <Recommend posts={getRecommendedPosts(allPosts, slug)} />
    </>
  );
};

export default PostPage;
