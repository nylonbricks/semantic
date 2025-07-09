import Image from 'next/image';
import Link from 'next/link';

import { Post } from '@contentlayer/generated';
import { RelativeTime } from '@semantic/components/ui';
import { ROUTES } from '@semantic/constants';
import { slugify } from '@semantic/utils';

export const Header = ({
  coverImage,
  coverImageBlur,
  title,
  subtitle,
  createdAt,
  category,
  tags,
}: Post) => {
  return (
    <header className="mt-[1.25rem] mb-[3.5rem]">
      <div className="center relative w-full aspect-[1.8/1] border border-[var(--color-border)] rounded-[0.875rem] select-none overflow-hidden">
        <Image
          className="object-cover object-center w-full h-full"
          src={coverImage}
          alt={`${title} Cover Image`}
          placeholder="blur"
          blurDataURL={coverImageBlur.blur}
          draggable={false}
          priority={false}
          quality={100}
          sizes="100vw"
          fill
        />
      </div>

      <h1 className="post-title p-0 mt-[1.0625rem] text-[var(--color-gray-accent)] break-keep">
        {title}
      </h1>

      <h2 className="post-subtitle p-0 mt-[0.5rem] text-[var(--color-gray-bold)]">{subtitle}</h2>

      <p className="center-y h5 mt-[1.125rem] text-[var(--color-gray-light)] break-keep">
        <RelativeTime time={createdAt} />
        {category && (
          <>
            <span className="text-[var(--color-gray-bold)]">&nbsp;&middot;&nbsp;</span>
            <Link
              href={`/categories/${slugify(category)}`}
              className="opacity-100 no-underline transition-opacity duration-200 ease-in-out hover:opacity-70"
            >
              {category}
            </Link>
          </>
        )}
      </p>

      {tags && tags?.length > 0 && (
        <ul className="center-y flex-wrap w-full mt-[1.5rem] gap-[0.5rem]">
          {tags.map((tag) => (
            <li
              key={tag}
              className="center py-[0.125rem] px-[0.375rem] text-[var(--color-gray-mid)] text-xs font-mono font-medium border border-[var(--color-background03)] rounded-[0.5rem] bg-[var(--color-background02)] transition-colors duration-150 ease-in-out hover:bg-[var(--color-background04)]"
            >
              <Link href={`${ROUTES.TAGS}/${slugify(tag)}`}>{tag}</Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};
