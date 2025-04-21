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
  border: `${rem(1)} solid ${theme.color.border}`,
  borderRadius: rem(14),
  userSelect: 'none',
  overflow: 'hidden',
});

globalStyle(`${cover} img`, {
  objectFit: 'cover',
  objectPosition: 'center',
  width: '100%',
  height: '100%',
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

export const tags = style({
  ...theme.layout.centerY,
  width: '100%',
  marginTop: rem(24),
  gap: rem(8),
});

export const tag = style({
  ...theme.layout.center,
  paddingBlock: rem(2),
  paddingInline: rem(6),
  color: theme.color.gray.mid,
  fontSize: theme.fontSize.xs,
  fontWeight: 500,
  border: `${rem(1)} solid ${theme.color.background03}`,
  borderRadius: rem(8),
  background: theme.color.background02,
  transition: 'background-color 150ms ease-in-out',

  ':hover': {
    background: theme.color.background04,
  },
});
