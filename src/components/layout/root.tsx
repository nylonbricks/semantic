'use client';

import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

import { ROUTES } from '@semantic/constants';

import { Header } from './header';
import { Sidebar } from './sidebar';

export const Layout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const isProjectPage = pathname?.startsWith(ROUTES.PROJECTS);

  return (
    <div
      className={twMerge(
        'w-full h-full mx-auto pl-0 tablet:pl-[var(--spacing-sidebar)]',
        isProjectPage
          ? 'max-w-full desktop:max-w-full'
          : 'max-w-[var(--spacing-app)] tablet:max-w-[calc(var(--spacing-app)+var(--spacing-sidebar))] desktop:max-w-[var(--spacing-app)] desktop:pl-0',
      )}
    >
      <Sidebar />
      <Header />
      <main className="column pt-[2.65625rem] tablet:pt-[6.25rem]" data-animate={true}>
        {children}
      </main>
    </div>
  );
};
