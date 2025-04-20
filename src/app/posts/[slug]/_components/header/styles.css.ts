import { globalStyle, style } from '@vanilla-extract/css';

import { rem, theme } from '@semantic/styles';

export const root = style({
  marginTop: rem(20),
  marginBottom: rem(56),
});

export const cover = style({
  ...theme.layout.center,
  position: 'relative',
  width: '100%',
  aspectRatio: '1.8 / 1',
  borderRadius: rem(14),
  backgroundColor: theme.color.border,
  userSelect: 'none',
  overflow: 'hidden',
});

export const title = style({
  ...theme.typography.post_title,
  padding: 0,
  marginTop: rem(17),
  color: theme.color.gray.accent,
  wordBreak: 'keep-all',
});

export const subtitle = style({
  ...theme.typography.post_subtitle,
  padding: 0,
  marginTop: rem(8),
  color: theme.color.gray.bold,
});

export const description = style({
  ...theme.layout.centerY,
  ...theme.typography.h5,
  marginTop: rem(18),
  color: theme.color.gray.light,
  wordBreak: 'keep-all',
});

export const middot = style({
  color: theme.color.gray.bold,
});

globalStyle(`${description} a`, {
  opacity: 1,
  transition: 'opacity 0.2s',
  textDecoration: 'none',
});

globalStyle(`${description} a:hover`, {
  opacity: 0.7,
});
