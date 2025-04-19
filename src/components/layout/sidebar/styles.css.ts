import { style } from '@vanilla-extract/css';

import { breakpoint, rem, theme } from '@semantic/styles';

export const root = style({
  ...theme.layout.rowBetween,
  position: 'fixed',
  display: 'none',
  top: 0,
  left: 0,
  flexDirection: 'column',
  width: theme.size.sidebarWidth,
  height: '100dvh',
  paddingInline: rem(40),
  paddingBlock: rem(44),

  ...breakpoint({ tablet: { display: 'flex' } }),
});

export const topContainer = style({
  ...theme.layout.column,
  width: '100%',
  gap: rem(25),
});

export const branding = style({
  ...theme.typography.h3,
  paddingBlock: rem(12.5),
  paddingInline: rem(10),
  color: theme.color.gray.accent,
  wordBreak: 'keep-all',
  userSelect: 'none',
});

export const bottomContainer = style({
  ...theme.layout.column,
  width: '100%',
  gap: rem(20),
});

export const license = style({
  ...theme.typography.h6,
  width: '100%',
  color: theme.color.license,
});
