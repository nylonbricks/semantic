import { style } from '@vanilla-extract/css';

import { rem, theme } from '@semantic/styles';

export const title = style({
  color: theme.color.gray.accent,
  fontFamily: theme.fontFamily.mono,
  fontSize: theme.fontSize.lg,
  fontWeight: 500,
});

export const postGrid = style({
  marginTop: rem(36),
  marginBottom: rem(56),
});
