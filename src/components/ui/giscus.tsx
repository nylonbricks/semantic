'use client';

import { useTheme } from 'next-themes';
import { type ComponentProps, useEffect, useMemo, useRef, useState } from 'react';

import { GISCUS } from '@semantic/constants';

type GiscusProps = ComponentProps<'section'>;

export const Giscus = ({ ...props }: GiscusProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme: appTheme } = useTheme();

  const theme = useMemo(
    () => (appTheme === 'dark' ? 'noborder_gray' : 'noborder_light'),
    [appTheme],
  );

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const attributes = {
      src: 'https://giscus.app/client.js',
      'data-repo': GISCUS.REPO,
      'data-repo-id': GISCUS.REPO_ID,
      'data-category': GISCUS.CATEGORY,
      'data-category-id': GISCUS.CATEGORY_ID,
      'data-mapping': GISCUS.MAPPING,
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'bottom',
      'data-theme': theme,
      'data-lang': 'en',
      crossorigin: 'anonymous',
    };

    const script = document.createElement('script');
    script.async = true;

    Object.entries(attributes).forEach(([key, value]) => script.setAttribute(key, value));
    container.appendChild(script);

    setMounted(true);
    return () => {
      container.innerHTML = '';
    };
    // We intentionally mount the Giscus script once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app');
  }, [theme, mounted]);

  return <section ref={ref} {...props} />;
};
