import dayjs from 'dayjs';
import Link from 'next/link';

import { allPosts, type Post } from '@contentlayer/generated';
import { PlusIcon } from '@semantic/components/icon';
import { PostGrid } from '@semantic/components/ui';
import { ROUTES } from '@semantic/constants';

import { ProfileGrid } from './_components/profile-grid';
import * as styles from './page.css';

const getSortedPosts = (posts: Post[]) => {
  return posts
    .sort((a, b) => (dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1))
    .slice(0, 2);
};

const HomePage = () => {
  const posts: Post[] = getSortedPosts(allPosts);

  return (
    <>
      <ProfileGrid />

      <section className={styles.root}>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>Update</h3>
          <Link href={ROUTES.POSTS} className={styles.expandLink}>
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
