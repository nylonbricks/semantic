import { getAllPosts, getPostBySlug, type Post } from "@libs/content";
import { Divider } from "@semantic/components/ui/divider";
import { ROUTES } from "@semantic/constants/menu";
import { METADATA } from "@semantic/constants/metadata";
import { generatePageMetadata } from "@semantic/utils/metadata-util";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { BackButton } from "./_components/back-button";
import { Footer } from "./_components/footer";
import { Giscus } from "./_components/giscus";
import { Header } from "./_components/header";
import { Recommend } from "./_components/recommend";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

const RECOMMEND_COUNT = 4;

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

export const generateMetadata = async ({
  params,
}: PostPageProps): Promise<Metadata> => {
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
      type: "article",
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
  const sorted = [...posts].sort((a, b) =>
    a.createdAt > b.createdAt ? -1 : 1
  );
  const currentIndex = sorted.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    return sorted.slice(0, RECOMMEND_COUNT);
  }

  const sliceClamped = (start: number, end: number) =>
    sorted.slice(Math.max(0, start), Math.min(sorted.length, end));

  const prev = sliceClamped(currentIndex - 2, currentIndex);
  const next = sliceClamped(currentIndex + 1, currentIndex + 3);

  let recommended = [...prev, ...next];

  if (recommended.length < RECOMMEND_COUNT) {
    const need = RECOMMEND_COUNT - recommended.length;
    const isFront = currentIndex < sorted.length / 2;
    const isIncluded = (post: Post) =>
      recommended.some((p) => p.slug === post.slug);

    if (isFront) {
      const more = sliceClamped(currentIndex + 3, currentIndex + 3 + need * 2)
        .filter((post) => !isIncluded(post))
        .slice(0, need);
      recommended = [...recommended, ...more];
    } else {
      const prevWindowStart = Math.max(0, currentIndex - 2);
      const more = sliceClamped(prevWindowStart - need * 2, prevWindowStart)
        .filter((post) => !isIncluded(post))
        .slice(0, need);
      recommended = [...more, ...recommended];
    }
  }

  return recommended;
};
