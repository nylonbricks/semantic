import dayjs from 'dayjs';
import Link from 'next/link';

import { Divider } from '@semantic/components/ui';
import { METADATA, ROUTES } from '@semantic/constants';

import * as styles from './styles.css';
import { NavigateMenu } from '../navigate-menu';
import { ThemeToggle } from '../theme-toggle';

export const Sidebar = () => {
  return (
    <aside className={styles.root}>
      <div className={styles.topContainer}>
        <Link href={ROUTES.HOME} className={styles.branding}>
          {METADATA.SITE.NAME}
        </Link>
        <Divider />
        <NavigateMenu />
      </div>

      <div className={styles.bottomContainer}>
        <ThemeToggle />
        <p className={styles.license}>
          Copyright © {dayjs().year()} {METADATA.AUTHOR.NAME}, All rights reserved.
        </p>
      </div>
    </aside>
  );
};
