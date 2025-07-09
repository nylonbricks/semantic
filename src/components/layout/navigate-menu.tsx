'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import { MENU } from '@semantic/constants';

export const NavigateMenu = () => {
  const pathname = usePathname();
  const path: string = pathname.split('/')[1].trim();

  return (
    <nav aria-label="Main navigation">
      <ul className="column w-full gap-[0.3125rem]">
        {MENU.map((menu) => {
          const isActive = path === menu.link.replace(/\//g, '');
          return (
            <li
              key={menu.link}
              className={twMerge(
                'w-full h-10 text-[var(--color-gray-mid)] rounded-[0.625rem]',
                isActive && 'text-[var(--color-gray-accent)] bg-[var(--color-border)]',
              )}
            >
              <Link
                href={menu.link}
                className="center-y a w-full h-full px-[0.625rem]"
                aria-current={isActive ? 'page' : undefined}
              >
                {menu.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
