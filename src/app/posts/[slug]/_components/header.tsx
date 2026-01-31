import { RelativeTime } from "@semantic/components/ui/relative-time";
import { ROUTES } from "@semantic/constants/menu";
import { slugify } from "@semantic/utils/text-util";
import Image from "next/image";
import Link from "next/link";

import type { Post } from "@/types/content";

export const Header = ({
  coverImage,
  title,
  subtitle,
  createdAt,
  category,
  tags,
}: Post) => {
  return (
    <header className="mt-[1.25rem] mb-[3.5rem]">
      <div className="center relative aspect-[1.8/1] w-full select-none overflow-hidden rounded-[0.875rem] border border-[var(--color-border)]">
        <Image
          alt={`${title} Cover Image`}
          className="h-full w-full object-cover object-center"
          draggable={false}
          fill
          priority={false}
          quality={100}
          sizes="100vw"
          src={coverImage}
        />
      </div>

      <h1 className="post-title mt-[1.0625rem] break-keep p-0 text-[var(--color-gray-accent)]">
        {title}
      </h1>

      <h2 className="post-subtitle mt-[0.5rem] p-0 text-[var(--color-gray-bold)]">
        {subtitle}
      </h2>

      <p className="center-y h5 mt-[1.125rem] break-keep text-[var(--color-gray-light)]">
        <RelativeTime time={createdAt} />
        {category && (
          <>
            <span className="text-[var(--color-gray-bold)]">
              &nbsp;&middot;&nbsp;
            </span>
            <Link
              className="no-underline opacity-100 transition-opacity duration-200 ease-in-out hover:opacity-70"
              href={`/categories/${slugify(category)}`}
            >
              {category}
            </Link>
          </>
        )}
      </p>

      {tags && tags?.length > 0 && (
        <ul className="center-y mt-[1.5rem] w-full flex-wrap gap-[0.5rem]">
          {tags.map((tag) => (
            <li
              className="center rounded-[0.5rem] border border-[var(--color-background03)] bg-[var(--color-background02)] px-[0.375rem] py-[0.125rem] font-medium font-mono text-[var(--color-gray-mid)] text-xs transition-colors duration-150 ease-in-out hover:bg-[var(--color-background04)]"
              key={tag}
            >
              <Link href={`${ROUTES.TAGS}/${slugify(tag)}`}>{tag}</Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};
