import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ComponentType } from 'react';

import { getAllPosts, getPostBySlug, type Post } from '@libs/content';
import { Divider } from '@semantic/components/ui';
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

  let MDXContent: ComponentType;
  try {
    const mod = await import(`../_articles/${slug}.mdx`);
    MDXContent = mod.default;
  } catch {
    notFound();
  }

  const post = await getPostBySlug(slug);
  const allPosts = await getAllPosts();

  return (
    <>
      <BackButton />

      <article>
        <Header {...post} />
        <MDXContent />

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

  try {
    const { metadata } = await import(`../_articles/${slug}.mdx`);
    if (!metadata) {
      return generatePageMetadata({});
    }

    return generatePageMetadata({
      title: metadata.title,
      description: metadata.subtitle,
      path: `${ROUTES.POSTS}/${slug}`,
      image: metadata.coverImage,
      type: 'article',
      openGraph: {
        publishedTime: metadata.createdAt,
        modifiedTime: metadata.modifiedAt,
        authors: [METADATA.AUTHOR.NAME],
        tags: metadata.tags,
      },
    });
  } catch {
    return generatePageMetadata({});
  }
};

export async function generateStaticParams() {
  const allPosts = await getAllPosts();
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
