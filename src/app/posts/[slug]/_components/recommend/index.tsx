import React from 'react';

import { Post } from '@contentlayer/generated';
import { PostGrid } from '@semantic/components/ui';

import * as styles from './styles.css';

type RecommendProps = {
  posts: Post[];
};

export const Recommend = ({ posts }: RecommendProps) => {
  return (
    <div>
      <h3 className={styles.title}>🦾 Check them out</h3>
      <PostGrid className={styles.postGrid} posts={posts} />
    </div>
  );
};
