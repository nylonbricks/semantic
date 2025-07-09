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

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

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

        {post.comments && <Giscus className="mt-[3.5rem]" />}

        <Divider className="mb-[3.5rem]" />
        <Footer {...post} />
      </article>

      <Divider className="my-[3.5rem]" />
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

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

const getRecommendedPosts = (posts: Post[], slug: string): Post[] => {
  const sorted = [...posts].sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
  const idx = sorted.findIndex((p) => p.slug === slug);

  if (idx === -1) {
    return sorted.slice(0, 4);
  }

  const getPosts = (start: number, end: number) =>
    sorted.slice(Math.max(0, start), Math.min(sorted.length, end));

  const prev = getPosts(idx - 2, idx);
  const next = getPosts(idx + 1, idx + 3);

  let rec = [...prev, ...next];

  if (rec.length < 4) {
    const need = 4 - rec.length;
    const isFront = idx < sorted.length / 2;
    const isIncluded = (p: Post) => rec.some((r) => r.slug === p.slug);

    if (isFront) {
      const more = getPosts(idx + 3, idx + 3 + need * 2)
        .filter((p) => !isIncluded(p))
        .slice(0, need);
      rec = [...rec, ...more];
    } else {
      const end = idx - 2;
      const more = getPosts(end - need * 2, end)
        .filter((p) => !isIncluded(p))
        .slice(0, need);
      rec = [...more, ...rec];
    }
  }

  return rec;
};
