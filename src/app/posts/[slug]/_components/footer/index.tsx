'use client';

import { Post } from '@contentlayer/generated';
import { ShareIcon } from '@semantic/components/icon';
import { METADATA, ROUTES } from '@semantic/constants';

import { BackButton } from '../back-button';
import * as styles from './styles.css';

export const Footer = ({ slug, title, subtitle }: Post) => {
  const handleShare = async () => {
    const shareData = {
      title,
      text: subtitle,
      url: `${METADATA.SITE.URL}${ROUTES.POSTS}/${slug}`,
    };

    await navigator.share(shareData);
  };

  return (
    <footer className={styles.root}>
      <BackButton />
      <button className={styles.share} onClick={handleShare}>
        Share this post
        <ShareIcon size={18} />
      </button>
    </footer>
  );
};
