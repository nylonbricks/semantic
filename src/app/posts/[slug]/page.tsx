import { notFound } from 'next/navigation';

import { allPosts } from '@contentlayer/generated';
import { MdxComponent } from '@semantic/components/ui';

import { Header } from './_components/header';

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

const PostPage = async ({ params }: PostPageProps) => {
  const { slug } = await params;

  const post = allPosts.find((post) => post.slug === slug);

  if (!post) notFound();

  return (
    <>
      <article>
        <Header {...post} />
        <MdxComponent code={post.body.code} blurDataURLs={post.blurMap} />
      </article>
    </>
  );
};

export default PostPage;

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}
