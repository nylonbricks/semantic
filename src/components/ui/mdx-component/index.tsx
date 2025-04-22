'use client';

import Image from 'next/image';
import { useMDXComponent } from 'next-contentlayer2/hooks';
import { ComponentProps } from 'react';

import * as styles from './styles.css';

type MdxComponentProps = {
  code: string;
  blurDataURLs?: Record<string, string>;
};

export const MdxComponent = ({ code, blurDataURLs = {} }: MdxComponentProps) => {
  const components = {
    h2: ({ children, ...props }: ComponentProps<'h2'>) => (
      <h2 className={styles.h2} {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: ComponentProps<'h3'>) => (
      <h3 className={styles.h3} {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }: ComponentProps<'h4'>) => (
      <h4 className={styles.h4} {...props}>
        {children}
      </h4>
    ),
    h5: ({ children, ...props }: ComponentProps<'h5'>) => (
      <h5 className={styles.h5} {...props}>
        {children}
      </h5>
    ),
    h6: ({ children, ...props }: ComponentProps<'h6'>) => (
      <h6 className={styles.h6} {...props}>
        {children}
      </h6>
    ),
    p: ({ children, ...props }: ComponentProps<'p'>) => (
      <p className={styles.p} {...props}>
        {children}
      </p>
    ),
    blockquote: ({ children, ...props }: ComponentProps<'blockquote'>) => (
      <blockquote className={styles.blockquote} {...props}>
        {children}
      </blockquote>
    ),
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
