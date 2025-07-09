'use client';

import { useTheme } from 'next-themes';

import { ClientOnly } from '@semantic/components/util';

export const ThemeToggle = () => {
  const { resolvedTheme: theme, setTheme } = useTheme();

  return (
    <ClientOnly
      fallback={
        <div className="center h4 w-full h-10 text-[var(--color-gray-accent)] border border-[var(--color-border)] rounded-[0.625rem] bg-[var(--color-toggle)]" />
      }
    >
      <button
        className="center h4 w-full h-10 text-[var(--color-gray-accent)] border border-[var(--color-border)] rounded-[0.625rem] bg-[var(--color-toggle)] cursor-pointer"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        aria-label="Toggle dark or light mode"
      >
        {theme === 'light' ? '🌚 Dark mode' : '🌞 Light mode'}
      </button>
    </ClientOnly>
  );
};
