import { style } from '@vanilla-extract/css';

import { rem, theme } from '@semantic/styles';

export const root = style({
  ...theme.layout.column,
  paddingTop: rem(70),
  paddingBottom: rem(65),
  gap: rem(30),
});

export const titleContainer = style({
  ...theme.layout.rowBetween,
});

export const title = style({
  ...theme.typography.h3,
  color: theme.color.gray.light,
});

export const expandLink = style({
  ...theme.layout.center,
  ...theme.typography.h4,
  height: rem(32),
  paddingInline: rem(12),
  color: theme.color.gray.light,
  border: `${rem(1)} solid ${theme.color.border}`,
  borderRadius: rem(10),
  backgroundColor: theme.color.toggle,
  gap: rem(6),
});
