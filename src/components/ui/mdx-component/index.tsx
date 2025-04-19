'use client';

import Image from 'next/image';
import { useMDXComponent } from 'next-contentlayer2/hooks';
import { ComponentProps, ReactNode } from 'react';

import * as styles from './styles.css';

type MdxComponentProps = {
  code: string;
  blurDataURLs?: Record<string, string>;
};

export const MdxComponent = ({ code, blurDataURLs = {} }: MdxComponentProps) => {
  const components = {
    h2: ({ children }: { children: ReactNode }) => <h2 className={styles.h2}>{children}</h2>,
    h3: ({ children }: { children: ReactNode }) => <h3 className={styles.h3}>{children}</h3>,
    h4: ({ children }: { children: ReactNode }) => <h4 className={styles.h4}>{children}</h4>,
    h5: ({ children }: { children: ReactNode }) => <h5 className={styles.h5}>{children}</h5>,
    h6: ({ children }: { children: ReactNode }) => <h6 className={styles.h6}>{children}</h6>,
    p: ({ children }: { children: ReactNode }) => <p className={styles.p}>{children}</p>,
    img: ({
      src,
      alt,
      ...props
    }: {
      src: string;
      alt?: string;
    } & Omit<ComponentProps<typeof Image>, 'src' | 'alt'>) => {
      if (!src) return null;

      const blurDataURL = blurDataURLs[src];

      return (
        <span className={styles.image}>
          <Image
            src={src}
            alt={alt || ''}
            width={0}
            height={0}
            quality={100}
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder={blurDataURL ? 'blur' : 'empty'}
            blurDataURL={blurDataURL}
            priority
            {...props}
          />
        </span>
      );
    },
  };

  const MDXComponent = useMDXComponent(code);

  return (
    <div className={styles.root}>
      <MDXComponent components={components} />
    </div>
  );
};
