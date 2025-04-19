'use client';

import { useEffect, useState } from 'react';

import { useTheme } from '@semantic/app/theme-provider';

import * as styles from './styles.css';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  return (
    <button className={styles.themeToggle} onClick={toggleTheme}>
      {isClient ? (theme === 'light' ? '🌚 Dark mode' : '🌞 Light mode') : ''}
    </button>
  );
};
