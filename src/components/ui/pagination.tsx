"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@semantic/components/icon";
import Link from "next/link";

const TRAILING_SLASH = /\/$/;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) => {
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
    const path = basePath.replace(TRAILING_SLASH, "");
    return `${path}?page=${page}`;
  };

  const pageList = generatePageRange();

  return (
    <nav
      aria-label="Pagination navigation"
      className="center gap-[8px] py-[28px]"
    >
      {currentPage > 1 && (
        <Link
          aria-label="Go to previous page"
          className="center h-[32px] w-[32px] rounded-full border-[1px] border-[var(--color-border)] bg-[var(--color-toggle)] font-medium font-mono text-[var(--color-gray-accent)] text-sm transition-colors duration-150 ease-in-out hover:bg-[var(--color-background02)]"
          href={buildPageHref(currentPage - 1)}
        >
          <ChevronLeftIcon />
        </Link>
      )}

      {pageList.map((pageNumber) =>
        pageNumber === currentPage ? (
          <span
            aria-current="page"
            className="center h-[32px] w-[32px] rounded-full border-[1px] border-[var(--color-background04)] bg-[var(--color-gray-bold)] font-medium font-mono text-[var(--color-background)] text-sm transition-colors duration-150 ease-in-out hover:bg-[var(--color-gray-accent)]"
            key={pageNumber}
          >
            {pageNumber}
          </span>
        ) : (
          <Link
            aria-label={`Go to page ${pageNumber}`}
            className="center h-[32px] w-[32px] rounded-full border-[1px] border-[var(--color-border)] bg-[var(--color-toggle)] font-medium font-mono text-[var(--color-gray-accent)] text-sm transition-colors duration-150 ease-in-out hover:bg-[var(--color-background02)]"
            href={buildPageHref(pageNumber)}
            key={pageNumber}
          >
            {pageNumber}
          </Link>
        )
      )}

      {currentPage < totalPages && (
        <Link
          aria-label="Go to next page"
          className="center h-[32px] w-[32px] rounded-full border-[1px] border-[var(--color-border)] bg-[var(--color-toggle)] font-medium font-mono text-[var(--color-gray-accent)] text-sm transition-colors duration-150 ease-in-out hover:bg-[var(--color-background02)]"
          href={buildPageHref(currentPage + 1)}
        >
          <ChevronRightIcon />
        </Link>
      )}
    </nav>
  );
};
