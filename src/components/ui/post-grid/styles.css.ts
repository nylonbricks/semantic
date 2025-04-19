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
  width: '100%',
  userSelect: 'none',
  overflow: 'hidden',
});

globalStyle(`${cover} > div[data-gatsby-image-wrapper]`, {
  width: '100%',
  aspectRatio: '1.8 / 1',
  borderRadius: rem(14),
  overflow: 'hidden',
  transition: 'filter 0.3s',
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
  transition: 'background-color 0.3s ease',
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
  transition: 'background-color 0.3s ease',
});

globalStyle(
  `${container}:hover ${cover} > div[data-gatsby-image-wrapper], ${container}:active ${cover} > div[data-gatsby-image-wrapper]`,
  {
    filter: 'brightness(1.2)',
  },
);

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
