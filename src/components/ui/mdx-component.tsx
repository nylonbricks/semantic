import Image from 'next/image';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { codeToHtml, createCssVariablesTheme } from 'shiki';
import { twMerge } from 'tailwind-merge';

import { GiscusTester } from '@semantic/app/posts/_articles/giscus-tester';

const cssVariablesTheme = createCssVariablesTheme({});

const H1 = (props: ComponentProps<'h1'>) => (
  <h1 className="mb-6 text-balance font-semibold text-xl" {...props} />
);
const H2 = (props: ComponentProps<'h2'>) => (
  <h2 className="mt-12 mb-6 text-balance font-semibold text-lg" {...props} />
);
const H3 = (props: ComponentProps<'h3'>) => (
  <h3 className="mt-12 mb-6 text-balance font-semibold" {...props} />
);
const UL = (props: ComponentProps<'ul'>) => (
  <ul className="mt-6 flex list-outside list-disc flex-col gap-2 pl-5" {...props} />
);
const OL = (props: ComponentProps<'ol'>) => (
  <ol className="mt-6 flex list-outside list-decimal flex-col gap-2 pl-5" {...props} />
);
const LI = (props: ComponentProps<'li'>) => (
  <li className="pl-1 font-normal text-md leading-relaxed [&_ol]:mt-2 [&_ul]:mt-2" {...props} />
);

type AnchorProps = Omit<ComponentProps<'a'>, 'href'> & { href?: string };
const A = ({ href, ...props }: AnchorProps) => (
  <Link
    className={twMerge(
      'break-keep underline decoration-from-font underline-offset-3 transition-colors duration-150',
      'outline-offset-2 hover:opacity-80',
      href?.startsWith('https://') && 'external-link',
    )}
    draggable={false}
    href={href ?? ''}
    {...(href?.startsWith('https://')
      ? {
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : {})}
    {...props}
  />
);

const Strong = (props: ComponentProps<'strong'>) => (
  <strong className="font-semibold text-md" {...props} />
);

const P = (props: ComponentProps<'p'>) => (
  <p className="post-body mt-6 font-normal text-md text-[var(--color-gray-accent)]" {...props} />
);

const Blockquote = (props: ComponentProps<'blockquote'>) => (
  <blockquote
    className="column -ml-6 p-4 pl-6 border border-[var(--color-border)] rounded-[0.625rem] bg-[var(--color-background02)] sm:-ml-10 sm:pl-10 md:-ml-14 md:pl-14"
    {...props}
  />
);

const Pre = (props: ComponentProps<'pre'>) => (
  <pre className="mt-6 whitespace-pre md:whitespace-pre-wrap" {...props} />
);

type CodeProps = ComponentProps<'code'>;
const Code = async (props: CodeProps) => {
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
};

type ImgProps = Omit<ComponentProps<'img'>, 'src' | 'alt'> & { src?: string; alt?: string };
const Img = ({ src, alt, ...props }: ImgProps) => {
  if (!src) return null;

  if (src.startsWith('https://') || src.startsWith('/content/')) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={alt ?? ''}
        className="h-auto max-w-full border border-[var(--color-border)] rounded-[0.875rem]"
        draggable={false}
        src={src}
        {...props}
      />
    );
  }

  return <p>Image Loading Error (src: {src})</p>;
};

const HR = (props: ComponentProps<'hr'>) => (
  <hr className="mx-auto my-12 w-24 border-[var(--color-border)]" {...props} />
);

export const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  ul: UL,
  ol: OL,
  li: LI,
  a: A,
  strong: Strong,
  p: P,
  blockquote: Blockquote,
  pre: Pre,
  code: Code,
  img: Img,
  hr: HR,
  Image,
  GiscusTester,
};
