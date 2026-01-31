import type { MDXComponents } from 'mdx/types';

import { components } from './src/components/ui/mdx-component';

export function useMDXComponents(inherited: MDXComponents): MDXComponents {
  return {
    ...inherited,
    ...components,
  };
}
