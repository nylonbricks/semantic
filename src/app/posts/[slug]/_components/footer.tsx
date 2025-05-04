'use client';

import { Post } from '@contentlayer/generated';
import { ShareIcon } from '@semantic/components/icon';
import { METADATA, ROUTES } from '@semantic/constants';

import { BackButton } from './back-button';

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
    <footer className="row-between">
      <BackButton />
      <button
        onClick={handleShare}
        aria-label="Share this post"
        className="center-y h3 w-fit py-[0.3125rem] pr-[0.5625rem] text-[var(--color-gray-accent)] cursor-pointer select-none gap-[0.5rem] opacity-100 transition-opacity duration-150 ease-in-out hover:opacity-70"
      >
        Share this post
        <ShareIcon size={18} />
      </button>
    </footer>
  );
};
