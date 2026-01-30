import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { codeToHtml, createCssVariablesTheme } from 'shiki';
import { twMerge } from 'tailwind-merge';

import { GiscusTester } from '@semantic/app/posts/_articles/giscus-tester';

const cssVariablesTheme = createCssVariablesTheme({});

export const components: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: any) => ReactNode | Promise<ReactNode>
> = {
  h1: (props) => <h1 className="mb-6 text-balance font-semibold text-xl" {...props} />,
  h2: (props) => <h2 className="mt-12 mb-6 text-balance font-semibold text-lg" {...props} />,
  h3: (props) => <h3 className="mt-12 mb-6 text-balance font-semibold" {...props} />,
  ul: (props) => <ul className="mt-6 flex list-outside list-disc flex-col gap-2 pl-5" {...props} />,
  ol: (props) => (
    <ol className="mt-6 flex list-outside list-decimal flex-col gap-2 pl-5" {...props} />
  ),
  li: (props) => (
    <li className="pl-1 font-normal text-md leading-relaxed [&_ol]:mt-2 [&_ul]:mt-2" {...props} />
  ),
  a: ({ href, ...props }) => (
    <Link
      className={twMerge(
        'break-keep underline decoration-from-font underline-offset-3 transition-colors duration-150',
        'outline-offset-2 hover:opacity-80',
        href?.startsWith('https://') && 'external-link',
      )}
      draggable={false}
      href={href}
      {...(href?.startsWith('https://')
        ? {
            target: '_blank',
            rel: 'noopener noreferrer',
          }
        : {})}
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold text-md" {...props} />,
  p: (props) => (
    <p className="post-body mt-6 font-normal text-md text-[var(--color-gray-accent)]" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="column -ml-6 p-4 pl-6 border border-[var(--color-border)] rounded-[0.625rem] bg-[var(--color-background02)] sm:-ml-10 sm:pl-10 md:-ml-14 md:pl-14"
      {...props}
    />
  ),
  pre: (props) => <pre className="mt-6 whitespace-pre md:whitespace-pre-wrap" {...props} />,
  code: async (props) => {
    if (typeof props.children === 'string') {
      const highlightedCode = codeToHtml(props.children, {
        lang: 'jsx',
        theme: cssVariablesTheme,
        transformers: [
          {
            pre: (hast) => {
              if (hast.children.length !== 1) {
                throw new Error('<pre>: Expected a single <code> child');
              }
              if (hast.children[0]?.type !== 'element') {
                throw new Error('<pre>: Expected a <code> child');
              }
              return hast.children[0];
            },
            postprocess(html) {
              return html.replace(/^<code>|<\/code>$/g, '');
            },
          },
        ],
      });

      return (
        <code
          className="shiki css-variables inline text-xs md:text-[13px]"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: required to render the highlighted code.
          dangerouslySetInnerHTML={{ __html: await highlightedCode }}
        />
      );
    }

    return <code className="inline" {...props} />;
  },
  img: ({ src, alt }) => {
    if (!src) return null;

    if (src.startsWith('https://') || src.startsWith('/content/')) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={alt}
          className="h-auto max-w-full border border-[var(--color-border)] rounded-[0.875rem]"
          draggable={false}
          src={src}
        />
      );
    }

    return <p>Image Loading Error (src: {src})</p>;
  },
  hr: (props) => <hr className="mx-auto my-12 w-24 border-[var(--color-border)]" {...props} />,
  Image,
  GiscusTester,
};
