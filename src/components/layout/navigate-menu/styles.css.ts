import { style } from '@vanilla-extract/css';

import { rem, theme } from '@semantic/styles';

export const navList = style({
  ...theme.layout.column,
  width: '100%',
  gap: rem(5),
  listStyle: 'none',
});

export const navItem = style({
  width: '100%',
  height: rem(40),
  color: theme.color.gray.mid,
  borderRadius: rem(10),
  transition: 'background-color 200ms',
});

export const navItemActive = style({
  color: theme.color.gray.accent,
  backgroundColor: theme.color.border,
});

export const navLink = style({
  ...theme.layout.centerY,
  ...theme.typography.a,
  width: '100%',
  height: '100%',
  paddingInline: rem(10),
});
