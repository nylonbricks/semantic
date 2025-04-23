import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { allPosts, Post } from '@contentlayer/generated';
import { Divider, MdxComponent } from '@semantic/components/ui';
import { Giscus } from '@semantic/components/ui/giscus';
import { ROUTES, METADATA } from '@semantic/constants';
import { generatePageMetadata } from '@semantic/utils';

import { BackButton } from './_components/back-button';
import { Footer } from './_components/footer';
import { Header } from './_components/header';
import { Recommend } from './_components/recommend';
import * as styles from './page.css';

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

const getRecommendedPosts = (posts: Post[], slug: string) => {
  const sorted = posts.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
  const idx = sorted.findIndex((p) => p.slug === slug);

  if (idx === -1) return sorted.slice(0, 4);

  const getPosts = (start: number, end: number) =>
    sorted.slice(Math.max(0, start), Math.min(sorted.length, end));

  const prev = getPosts(idx - 2, idx).reverse();
  const next = getPosts(idx + 1, idx + 3);

  const rec = [...prev, ...next];

  if (rec.length < 4) {
    const need = 4 - rec.length;
    const isFront = idx < sorted.length / 2;

    const isIncluded = (p: Post) => rec.some((r) => r.slug === p.slug);

    if (isFront) {
      const start = idx + 3;
      const more = getPosts(start, start + need * 2)
        .filter((p) => !isIncluded(p))
        .slice(0, need);

      return [...rec, ...more];
    } else {
      const end = idx - 2;
      const more = getPosts(end - need * 2, end)
        .reverse()
        .filter((p) => !isIncluded(p))
        .slice(0, need);

      return [...more, ...rec];
    }
  }

  return rec;
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
        {post.comment && <Giscus className={styles.comment} />}
        <Divider className={styles.divider} />
        <Footer {...post} />
      </article>

      <Divider className={styles.divider} />
      <Recommend posts={getRecommendedPosts(allPosts, slug)} />
    </>
  );
};

export default PostPage;

export const generateMetadata = async ({ params }: PostPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    return generatePageMetadata({});
  }

  return generatePageMetadata({
    title: post.title,
    description: post.subtitle,
    path: `${ROUTES.POSTS}/${post.slug}`,
    image: post.coverImage,
    type: 'article',
    openGraph: {
      publishedTime: post.createdAt,
      modifiedTime: post.modifiedAt,
      authors: [METADATA.AUTHOR.NAME],
      tags: post.tags,
    },
  });
};
