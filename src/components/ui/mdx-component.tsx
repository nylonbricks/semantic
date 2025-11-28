'use client';

import Image from 'next/image';
import { useMDXComponent } from 'next-contentlayer2/hooks';
import { ComponentProps } from 'react';

type MdxComponentProps = {
  code: string;
  blurDataURLs?: Record<string, { blur: string; ratio: number }>;
};

export const MdxComponent = ({ code, blurDataURLs = {} }: MdxComponentProps) => {
  const components = {
    h2: ({ children, ...props }: ComponentProps<'h2'>) => (
      <h2 className="pt-12 text-lg font-semibold" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: ComponentProps<'h3'>) => (
      <h3 className="pt-9 text-md" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }: ComponentProps<'p'>) => (
      <p className="post-body text-[var(--color-gray-accent)]" {...props}>
        {children}
      </p>
    ),
    blockquote: ({ children, ...props }: ComponentProps<'blockquote'>) => (
      <blockquote
        className="column p-4 border border-[var(--color-background04)] rounded-[0.625rem] bg-[var(--color-background02)]"
        {...props}
      >
        {children}
      </blockquote>
    ),
    aside: ({ children, ...props }: ComponentProps<'aside'>) => (
      <aside
        className="column p-4 border border-[var(--color-border)] rounded-[0.625rem] bg-[var(--color-background05)]"
        {...props}
      >
        {children}
      </aside>
    ),
    Aside: ({ children, ...props }: ComponentProps<'aside'>) => (
      <aside
        className="column p-4 border border-[var(--color-border)] rounded-[0.625rem] bg-[var(--color-background05)]"
        {...props}
      >
        {children}
      </aside>
    ),
    Callout: ({
      children,
      icon,
      ...props
    }: ComponentProps<'aside'> & { icon?: React.ReactNode }) => (
      <aside
        className="flex flex-row items-start gap-3 p-4 border border-[var(--color-border)] rounded-[0.625rem] bg-[var(--color-background05)]"
        {...props}
      >
        {icon && <span className="text-xl leading-[1.6] select-none">{icon}</span>}
        <div className="column gap-2 flex-1">{children}</div>
      </aside>
    ),
    img: ({
      src,
      alt,
      ...props
    }: { src: string; alt?: string } & Omit<ComponentProps<typeof Image>, 'src' | 'alt'>) => {
      if (!src) return null;

      const imageData = blurDataURLs[src];

      return (
        <span
          className="relative inline-block w-full border border-[var(--color-border)] rounded-[0.875rem] overflow-hidden select-none"
          style={imageData?.ratio ? { aspectRatio: imageData.ratio } : undefined}
        >
          <Image
            className="w-full h-full object-cover"
            src={src}
            alt={alt || ''}
            width={0}
            height={0}
            quality={100}
            placeholder={imageData?.blur ? 'blur' : 'empty'}
            blurDataURL={imageData?.blur}
            sizes="100vw"
            loading="lazy"
            draggable={false}
            {...props}
          />
        </span>
      );
    },
  };

  const MDXComponent = useMDXComponent(code);

  return (
    <div className="column gap-[1.125rem]" data-mdx-article={true}>
      <MDXComponent components={components} />
    </div>
  );
};
