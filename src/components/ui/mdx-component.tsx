'use client';

import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useMDXComponent } from 'next-contentlayer2/hooks';
import { ComponentProps, useEffect, useState } from 'react';

import { FileDownload } from './file-download';

const DownloadButton = ({
  children,
  href,
  type = 'default',
  ...props
}: ComponentProps<'a'> & { type?: 'default' | 'pdf' }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        if (href) window.open(href, '_blank');
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [isLoading, href]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!isLoading) {
      setIsLoading(true);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="flex items-center justify-center w-full tablet:w-fit px-4 py-3 border border-[var(--color-border)] rounded-xl bg-[var(--color-background)] hover:bg-[var(--color-gray-hover)] transition-colors duration-200 cursor-pointer no-underline relative overflow-hidden min-h-[52px] min-w-[280px]"
      {...props}
    >
      {/* Default Content - Keeps height fixed */}
      <div
        className={`flex items-center justify-between w-full gap-3 transition-opacity duration-200 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{type === 'pdf' ? '📄' : '📎'}</span>
          <span className="font-medium text-[var(--color-gray-bold)]">{children}</span>
        </div>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[var(--color-gray-mid)]"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.7761 3 12 3.22386 12 3.5L12 9C12 9.27614 11.7761 9.5 11.5 9.5C11.2239 9.5 11 9.27614 11 9L11 4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center gap-3 bg-[var(--color-background)]"
          >
            <div className="relative w-5 h-5 animate-spin">
              <svg className="w-full h-full" viewBox="0 0 24 24">
                <circle
                  className="text-[var(--color-border)]"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="transparent"
                  r="10"
                  cx="12"
                  cy="12"
                />
                <circle
                  className="text-[var(--color-primary)]"
                  strokeWidth="3"
                  strokeDasharray={15}
                  strokeDashoffset={15}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="10"
                  cx="12"
                  cy="12"
                />
              </svg>
            </div>
            <span className="font-medium text-[var(--color-gray-bold)] text-sm">
              파일을 여는 중이에요...
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </a>
  );
};

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
    DownloadButton: (props: ComponentProps<'a'> & { type?: 'default' | 'pdf' }) => (
      <DownloadButton {...props} />
    ),
    FileDownload: (props: ComponentProps<typeof FileDownload>) => <FileDownload {...props} />,
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
