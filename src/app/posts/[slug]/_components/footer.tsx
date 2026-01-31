"use client";

import { ShareIcon } from "@semantic/components/icon/components/semantic/ShareIcon";
import { ROUTES } from "@semantic/constants/menu";
import { METADATA } from "@semantic/constants/metadata";

import type { Post } from "@/types/content";
import { BackButton } from "./back-button";

export const Footer = ({ slug, title, subtitle }: Post) => {
  const copyText = async (text: string): Promise<boolean> => {
    try {
      if (
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        await navigator.clipboard.writeText(text);
        return true;
      }

      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();

      const ok = document.execCommand("copy");
      document.body.removeChild(textarea);
      return ok;
    } catch {
      return false;
    }
  };

  const handleShare = async () => {
    const shareData = {
      title,
      text: subtitle,
      url: `${METADATA.SITE.URL}${ROUTES.POSTS}/${slug}`,
    };

    const canShare =
      typeof navigator !== "undefined" &&
      typeof navigator.share === "function" &&
      (typeof navigator.canShare !== "function" ||
        navigator.canShare(shareData));

    let shared = false;

    if (canShare) {
      try {
        await navigator.share(shareData);
        shared = true;
      } catch {
        shared = false;
      }
    }

    if (shared) {
      return;
    }

    const copied = await copyText(shareData.url);
    if (!copied) {
      window.open(shareData.url, "_blank", "noopener,noreferrer");
      return;
    }

    // biome-ignore lint/suspicious/noAlert: user requested clipboard copy confirmation.
    alert("Link copied to clipboard.");
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
