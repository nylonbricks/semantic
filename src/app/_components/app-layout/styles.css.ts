import { style } from '@vanilla-extract/css';

import { breakpoint, rem, theme } from '@semantic/styles';

export const root = style({
  width: '100%',
  maxWidth: theme.size.appWidth,
  height: '100%',
  marginInline: 'auto',
  paddingLeft: 0,

  ...breakpoint({
    tablet: {
      maxWidth: `calc(${theme.size.appWidth} + ${theme.size.sidebarWidth})`,
      paddingLeft: theme.size.sidebarWidth,
    },
    desktop: {
      maxWidth: theme.size.appWidth,
      paddingLeft: 0,
    },
  }),
});

export const main = style({
  ...theme.layout.column,
  paddingTop: rem(42.5),

  ...breakpoint({
    tablet: {
      paddingTop: rem(100),
    },
  }),
});
