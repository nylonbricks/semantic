import { useEffect, useState } from 'react';

type Category = {
  emoji: string;
  id: string;
  name: string;
};

type CategoriesResponse = {
  repositoryId: string;
  categories: Category[];
};

type ErrorResponse = {
  error: string;
};

export const GiscusMetadata = () => {
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [message, setMessage] = useState(
    'A public GitHub repository. This repo is where the discussions will be linked to.',
  );
  const [status, setStatus] = useState<'default' | 'success' | 'error'>('default');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
    return () => clearTimeout(handler);
  }, [value]);

  useEffect(() => {
    const updateTheme = () => {
      const html = document.documentElement;
      const isDark = /\btheme_darkMode\S*/.test(html.className);
      setTheme(isDark ? 'dark' : 'light');
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  const colorVars = {
    border: `var(--border-${theme})`,
    bg: `var(--bg-${theme})`,
    text: `var(--text-${theme})`,
    status: {
      default: `var(--status-default-${theme})`,
      success: `var(--status-success-${theme})`,
      error: `var(--status-error-${theme})`,
    },
  };

  useEffect(() => {
    if (!debouncedValue) {
      setMessage(
        'A public GitHub repository. This repo is where the discussions will be linked to.',
      );
      setStatus('default');
      return;
    }

    fetch(`https://giscus.app/api/discussions/categories?repo=${debouncedValue}`)
      .then((res) => res.json())
      .then((data: CategoriesResponse | ErrorResponse) => {
        if ('error' in data) {
          setMessage(
            'Cannot use giscus on this repository. Make sure all of the above criteria has been met.',
          );
          setStatus('error');
        } else {
          setMessage('Success! This repository meets all of the above criteria.');
          setStatus('success');
        }
      })
      .catch((err) => {
        setMessage(`Network error: ${err.message}`);
        setStatus('error');
      });
  }, [debouncedValue]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', width: '100%' }}>
        <input
          style={{
            flex: 1,
            paddingBlock: '8px',
            paddingInline: '14px',
            border: `1px solid ${colorVars.border}`,
            borderRadius: '8px',
            backgroundColor: colorVars.bg,
            color: colorVars.text,
            fontSize: '14px',
            fontWeight: '500',
            outline: 'none',
          }}
          type="text"
          placeholder="nylon-bricks/semantic"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <p
        style={{
          fontSize: '13px',
          fontWeight: '500',
          color: colorVars.status[status],
        }}
      >
        {message}
      </p>
    </div>
  );
};
