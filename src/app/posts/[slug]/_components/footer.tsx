"use client";

import { ShareIcon } from "@semantic/components/icon/components/semantic/ShareIcon";
import { ROUTES } from "@semantic/constants/menu";
import { METADATA } from "@semantic/constants/metadata";

import type { Post } from "@/types/content";

import { BackButton } from "./back-button";

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
        aria-label="Share this post"
        className="center-y h3 w-fit cursor-pointer select-none gap-[0.5rem] py-[0.3125rem] pr-[0.5625rem] text-[var(--color-gray-accent)] opacity-100 transition-opacity duration-150 ease-in-out hover:opacity-70"
        onClick={handleShare}
        type="button"
      >
        Share this post
        <ShareIcon size={18} />
      </button>
    </footer>
  );
};
