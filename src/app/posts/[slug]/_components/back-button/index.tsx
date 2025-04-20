'use client';

import { ChevronLeftIcon } from '@semantic/components/icon';

import * as styles from './styles.css';

export const BackButton = () => {
  return (
    <button className={styles.root}>
      <ChevronLeftIcon size={18} />
      <span>Back</span>
    </button>
  );
};
