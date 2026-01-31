import { getAllPosts } from "@libs/content";
import { PlusIcon } from "@semantic/components/icon";
import { PostGrid } from "@semantic/components/ui";
import { ROUTES } from "@semantic/constants";
import dayjs from "dayjs";
import Link from "next/link";

import type { Post } from "@/types/content";

import { ProfileGrid } from "./_components/profile-grid";

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
        aria-labelledby="updates-heading"
        className="column gap-[1.875rem] pt-[4.375rem] pb-[4.0625rem]"
      >
        <div className="row-between">
          <h3
            className="h3 text-[var(--color-gray-light)]"
            id="updates-heading"
          >
            Update
          </h3>
          <Link
            aria-label="Expand to see more posts"
            className="center h4 h-8 gap-[0.375rem] rounded-[0.625rem] border border-[var(--color-border)] bg-[var(--color-toggle)] px-3 text-[var(--color-gray-light)]"
            href={ROUTES.POSTS}
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
