import { globalStyle, style } from '@vanilla-extract/css';

import { breakpoint, rem, theme } from '@semantic/styles';

export const grid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  width: '100%',
  gap: rem(65),

  ...breakpoint({ tablet: { gridTemplateColumns: '1fr 1fr' } }),
});

export const container = style({
  ...theme.layout.column,
  width: '100%',
  cursor: 'pointer',
});

export const cover = style({
  position: 'relative',
  width: '100%',
  aspectRatio: '1.8 / 1',
  borderRadius: rem(14),
  border: `${rem(1)} solid ${theme.color.border}`,
  overflow: 'hidden',
});

globalStyle(`${cover} img`, {
  objectFit: 'cover',
  objectPosition: 'center',
  width: '100%',
  height: '100%',
});

export const title = style({
  ...theme.typography.post_subtitle,
  display: '-webkit-box',
  paddingBlock: rem(2),
  paddingInline: rem(10),
  marginTop: rem(16),
  marginInline: rem(-10),
  marginBottom: rem(-2),
  color: theme.color.gray.accent,
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  textOverflow: 'ellipsis',
  borderRadius: rem(8),
  overflow: 'hidden',
  transition: 'background-color 250ms ease-in-out',
});

export const description = style({
  ...theme.typography.h4,
  width: 'fit-content',
  paddingBlock: rem(2),
  paddingInline: rem(10),
  marginTop: rem(16),
  marginInline: rem(-10),
  marginBottom: rem(-2),
  color: theme.color.gray.light,
  borderRadius: rem(8),
  transition: 'background-color 250ms ease-in-out',
});

globalStyle(`${container}:hover ${title}`, {
  backgroundColor: theme.color.gray.hover,
});

globalStyle(`${container}:hover ${description}`, {
  backgroundColor: theme.color.gray.hover,
});

globalStyle(`${container}:active ${title}`, {
  backgroundColor: theme.color.border,
});

globalStyle(`${container}:active ${description}`, {
  backgroundColor: theme.color.border,
});
