'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import * as styles from './styles.css';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => setIsClient(true), []);

  return (
    <button
      className={styles.themeToggle}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {isClient ? (theme === 'light' ? '🌚 Dark mode' : '🌞 Light mode') : ''}
    </button>
  );
};
