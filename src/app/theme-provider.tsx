'use client';

import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { darkMode, lightMode } from '@semantic/styles';

declare global {
  interface Window {
    __theme: string;
    __setPreferredTheme: (theme: string) => void;
    __onThemeChange: (theme: string) => void;
  }
}

type Theme = 'light' | 'dark';
type ThemeContextProps = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isInitialized: boolean;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initialTheme = (() => {
      if (typeof window === 'undefined') return 'light';

      try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme as Theme;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } catch {
        return 'light';
      }
    })();

    setTheme(initialTheme);
    setIsInitialized(true);

    const handleThemeChange = (newTheme: string) => {
      setTheme(newTheme as Theme);
    };

    if (typeof window !== 'undefined') {
      window.__onThemeChange = handleThemeChange;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      if (typeof window !== 'undefined') {
        window.__onThemeChange = () => undefined;
      }
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  const setThemeState = (newTheme: Theme) => {
    setTheme(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch (err) {
      console.error('Failed to save theme preference:', err);
    }
    if (typeof window !== 'undefined') {
      window.__setPreferredTheme(newTheme);
    }
  };

  const toggleTheme = () => setThemeState(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState, toggleTheme, isInitialized }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const themeBootstrapScript = `
  (function() {
    if (typeof window === 'undefined') return;
    
    let preferredTheme;
    window.__onThemeChange = function() {};

    function setTheme(newTheme) {
      window.__theme = newTheme;
      preferredTheme = newTheme;
      document.documentElement.setAttribute('data-theme', newTheme);
      document.documentElement.className = newTheme === 'dark' ? '${darkMode}' : '${lightMode}';
      
      window.__onThemeChange(newTheme);
    }

    try {
      preferredTheme = localStorage.getItem('theme');
    } catch (err) {}

    window.__setPreferredTheme = function(newTheme) {
      setTheme(newTheme);
      try {
        localStorage.setItem('theme', newTheme);
      } catch (err) {}
    };

    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      if (!localStorage.getItem('theme')) {
        window.__setPreferredTheme(e.matches ? 'dark' : 'light');
      }
    };

    if (typeof darkQuery.addEventListener === 'function') {
      darkQuery.addEventListener('change', handleSystemThemeChange);
    } else if (typeof darkQuery.addListener === 'function') {
      darkQuery.addListener(handleSystemThemeChange);
    }

    setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
  })();
`;
