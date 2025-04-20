'use client';

import { usePathname, useRouter } from 'next/navigation';

import { ChevronLeftIcon } from '@semantic/components/icon';

import * as styles from './styles.css';

export const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    if (pathname === '/') {
      router.back();
      return;
    }

    const path: string[] = pathname.split('/').filter(Boolean);
    if (path.length > 1) {
      const parent = `/${path.slice(0, -1).join('/')}`;
      router.replace(parent);
    } else {
      router.replace('/');
    }
  };

  return (
    <button className={styles.root} onClick={handleBack}>
      <ChevronLeftIcon size={18} />
      <span>Back</span>
    </button>
  );
};
