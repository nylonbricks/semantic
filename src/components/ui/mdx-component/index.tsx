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
    <div>
      <MDXComponent components={components} />
    </div>
  );
};
