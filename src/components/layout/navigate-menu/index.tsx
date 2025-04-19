'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MENU } from '@semantic/constants';

import * as styles from './styles.css';

export const NavigateMenu = () => {
  const pathname = usePathname();
  const path: string = pathname.split('/')[1].trim();

  return (
    <nav>
      <ul className={styles.navList}>
        {MENU.map((menu) => (
          <li
            key={menu.link}
            className={clsx(
              styles.navItem,
              path === menu.link.replace(/\//g, '') && styles.navItemActive,
            )}
            aria-selected={path === menu.link.replace(/\//g, '')}
          >
            <Link href={menu.link} className={styles.navLink}>
              {menu.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
