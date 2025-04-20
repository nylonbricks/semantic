'use client';

import { clsx } from 'clsx';
import Link from 'next/link';

import { ChevronLeftIcon, ChevronRightIcon } from '@semantic/components/icon';

import * as styles from './pagination.css';

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
    const trimmedBase = basePath.replace(/\/$/, '');
    return `${trimmedBase}/${page}`;
  };

  const pageList = generatePageRange();

  return (
    <nav className={styles.pagination} aria-label="Pagination navigation" role="navigation">
      {currentPage > 1 && (
        <Link
          href={buildPageHref(currentPage - 1)}
          className={styles.page}
          aria-label="Go to previous page"
        >
          <ChevronLeftIcon />
        </Link>
      )}

      {pageList.map((pageNumber) =>
        pageNumber === currentPage ? (
          <span
            key={pageNumber}
            className={clsx(styles.page, styles.active)}
            aria-current="page"
            role="link"
          >
            {pageNumber}
          </span>
        ) : (
          <Link
            key={pageNumber}
            href={buildPageHref(pageNumber)}
            className={styles.page}
            aria-label={`Go to page ${pageNumber}`}
          >
            {pageNumber}
          </Link>
        ),
      )}

      {currentPage < totalPages && (
        <Link
          href={buildPageHref(currentPage + 1)}
          className={styles.page}
          aria-label="Go to next page"
        >
          <ChevronRightIcon />
        </Link>
      )}
    </nav>
  );
};
