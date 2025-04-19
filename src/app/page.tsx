import dayjs from 'dayjs';
import Link from 'next/link';

import { allPosts, type Post } from '@contentlayer/generated';
import { PostGrid } from '@semantic/components/ui';

import { ProfileGrid } from './_components/profile-grid';
import * as styles from './page.css';

const HomePage = () => {
  const posts = getSortedPosts(allPosts).splice(0, 4);

  return (
    <>
      <ProfileGrid />

      <section className={styles.root}>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>Update</h3>
          <Link href="/posts" className={styles.expandLink}>
            Expand
          </Link>
        </div>
        <PostGrid posts={posts} />
      </section>
    </>
  );
};

export default HomePage;

const getSortedPosts = (posts: Post[]) => {
  return posts.sort((a, b) => (dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1));
};
