'use client';

import Link from 'next/link';

import { ChevronLeftIcon, ChevronRightIcon } from '@semantic/components/icon';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

export const Pagination = ({ currentPage, totalPages, basePath }: PaginationProps) => {
  const generatePageRange = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 2) {
      end = Math.min(5, totalPages);
    } else if (currentPage >= totalPages - 1) {
      start = Math.max(totalPages - 4, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, idx) => start + idx);
  };

  const buildPageHref = (page: number) => {
    const path = basePath.replace(/\/$/, '');
    return `${path}?page=${page}`;
  };

  const pageList = generatePageRange();

  return (
    <nav
      className="center py-[28px] gap-[8px]"
      aria-label="Pagination navigation"
      role="navigation"
    >
      {currentPage > 1 && (
        <Link
          className="center w-[32px] h-[32px] text-[var(--color-gray-accent)] font-mono text-sm font-medium rounded-full border-[1px] border-[var(--color-border)] bg-[var(--color-toggle)] transition-colors duration-150 ease-in-out hover:bg-[var(--color-background02)]"
          href={buildPageHref(currentPage - 1)}
          aria-label="Go to previous page"
        >
          <ChevronLeftIcon />
        </Link>
      )}

      {pageList.map((pageNumber) =>
        pageNumber === currentPage ? (
          <span
            key={pageNumber}
            className="center w-[32px] h-[32px] text-[var(--color-background)] font-mono text-sm font-medium rounded-full border-[1px] border-[var(--color-background04)] bg-[var(--color-gray-bold)] transition-colors duration-150 ease-in-out hover:bg-[var(--color-gray-accent)]"
            aria-current="page"
            role="link"
          >
            {pageNumber}
          </span>
        ) : (
          <Link
            key={pageNumber}
            href={buildPageHref(pageNumber)}
            className="center w-[32px] h-[32px] text-[var(--color-gray-accent)] font-mono text-sm font-medium rounded-full border-[1px] border-[var(--color-border)] bg-[var(--color-toggle)] transition-colors duration-150 ease-in-out hover:bg-[var(--color-background02)]"
            aria-label={`Go to page ${pageNumber}`}
          >
            {pageNumber}
          </Link>
        ),
      )}

      {currentPage < totalPages && (
        <Link
          href={buildPageHref(currentPage + 1)}
          className="center w-[32px] h-[32px] text-[var(--color-gray-accent)] font-mono text-sm font-medium rounded-full border-[1px] border-[var(--color-border)] bg-[var(--color-toggle)] transition-colors duration-150 ease-in-out hover:bg-[var(--color-background02)]"
          aria-label="Go to next page"
        >
          <ChevronRightIcon />
        </Link>
      )}
    </nav>
  );
};
