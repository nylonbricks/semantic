import dayjs from 'dayjs';
import Link from 'next/link';

import { getAllPosts } from '@libs/content';
import { PlusIcon } from '@semantic/components/icon';
import { PostGrid } from '@semantic/components/ui';
import { ROUTES } from '@semantic/constants';

import type { Post } from '@/types/content';

import { ProfileGrid } from './_components/profile-grid';

const getSortedPosts = (posts: Post[]) => {
  return posts
    .sort((a, b) => (dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1))
    .slice(0, 2);
};

const HomePage = async () => {
  const allPosts = await getAllPosts();
  const posts: Post[] = getSortedPosts(allPosts);

  return (
    <>
      <ProfileGrid />

      <section
        className="column pt-[4.375rem] pb-[4.0625rem] gap-[1.875rem]"
        aria-labelledby="updates-heading"
      >
        <div className="row-between">
          <h3 id="updates-heading" className="h3 text-[var(--color-gray-light)]">
            Update
          </h3>
          <Link
            href={ROUTES.POSTS}
            className="center h4 h-8 px-3 text-[var(--color-gray-light)] border border-[var(--color-border)] rounded-[0.625rem] bg-[var(--color-toggle)] gap-[0.375rem]"
            aria-label="Expand to see more posts"
          >
            Expand
            <PlusIcon />
          </Link>
        </div>
        <PostGrid posts={posts} />
      </section>
    </>
  );
};

export default HomePage;
