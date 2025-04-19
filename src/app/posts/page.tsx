import dayjs from 'dayjs';

import { allPosts, type Post } from '@contentlayer/generated';

import * as styles from './page.css';

const getSortedPosts = (posts: Post[]) => {
  return posts.sort((a, b) => (dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1));
};

const PostPage = () => {
  const posts = getSortedPosts(allPosts);

  return (
    <>
      <h3 className={styles.title}>Posts ({posts.length})</h3>

    </>
  );
};

export default PostPage;
