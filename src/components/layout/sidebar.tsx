import dayjs from 'dayjs';
import Link from 'next/link';

import { SymbolIcon } from '@semantic/components/icons/Symbol';
import { Divider } from '@semantic/components/ui';
import { METADATA, ROUTES } from '@semantic/constants';

import { NavigateMenu } from './navigate-menu';
import { ThemeToggle } from './theme-toggle';

export const Sidebar = () => {
  return (
    <aside
      className="justify-between fixed hidden top-0 left-0 flex-col w-[var(--spacing-sidebar)] h-[100dvh] px-[2.5rem] py-[2.75rem] tablet:flex"
      aria-label="Sidebar navigation"
    >
      <div className="column w-full gap-[1.5625rem]">
        <Link
          href={ROUTES.HOME}
          className="h3 py-[0.78125rem] px-[0.625rem] text-[var(--color-gray-accent)] break-keep user-select-none"
        >
          <SymbolIcon />
        </Link>
        <Divider />
        <nav>
          <NavigateMenu />
        </nav>
      </div>

      <div className="column w-full gap-[1.25rem]">
        <ThemeToggle />
        <p className="h6 w-full text-[var(--color-license)]">
          Copyright © {dayjs().year()} {METADATA.AUTHOR.NAME}, All rights reserved.
        </p>
      </div>
    </aside>
  );
};
