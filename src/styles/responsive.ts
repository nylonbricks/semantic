import { StyleRule } from '@vanilla-extract/css';

import { rem } from './pxto';

type BP = 'mobile' | 'tablet' | 'desktop' | string;

const breakpoints = {
  mobile: rem(640),
  tablet: rem(960),
  desktop: rem(1280),
};

export const breakpoint = (rules: Partial<Record<BP, StyleRule>>) => {
  const mediaQueries = Object.entries(rules).reduce(
    (acc, [bp, rule]) => {
      if (rule) {
        const minWidth: string = breakpoints[bp as keyof typeof breakpoints] || bp;
        acc[`screen and (min-width: ${minWidth})`] = rule;
      }
      return acc;
    },
    {} as Record<string, StyleRule>,
  );

  return {
    '@media': mediaQueries,
  };
};
