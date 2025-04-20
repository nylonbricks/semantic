import { globalStyle, style } from '@vanilla-extract/css';

import { breakpoint, rem, theme } from '@semantic/styles';

export const list = style({
  ...theme.layout.column,
  listStyle: 'none',
  gap: rem(30),
});

export const item = style({
  ...theme.layout.column,
  gap: rem(18),
  cursor: 'pointer',

  ...breakpoint({ tablet: { flexDirection: 'row', gap: rem(35) } }),
});

export const cover = style({
  position: 'relative',
  width: '100%',
  aspectRatio: '1.8 / 1',
  borderRadius: rem(14),
  border: `${rem(1)} solid ${theme.color.border}`,
  overflow: 'hidden',

  ...breakpoint({ tablet: { width: rem(346) } }),
});

globalStyle(`${cover} img`, {
  objectFit: 'cover',
  objectPosition: 'center',
  width: '100%',
  height: '100%',
});

export const frontmatter = style({
  ...theme.layout.column,
  flex: 1,
});

export const title = style({
  ...theme.typography.post_subtitle,
  paddingBlock: rem(2),
  paddingInline: rem(10),
  marginInline: rem(-10),
  marginBottom: rem(-2),
  color: theme.color.gray.accent,
  borderRadius: rem(8),
  transition: 'background-color 250ms ease',
});

export const subtitle = style({
  ...theme.typography.post_description,
  paddingBlock: rem(2),
  paddingInline: rem(10),
  marginTop: rem(12),
  marginInline: rem(-10),
  marginBottom: rem(-2),
  color: theme.color.gray.mid,
  borderRadius: rem(8),
  transition: 'background-color 250ms ease',

  ...breakpoint({ tablet: { marginTop: rem(20) } }),
});

export const description = style({
  ...theme.layout.centerY,
  ...theme.typography.h5,
  width: 'fit-content',
  paddingBlock: rem(2),
  paddingInline: rem(10),
  marginTop: rem(8),
  marginInline: rem(-10),
  marginBottom: rem(-2),
  color: theme.color.gray.light,
  borderRadius: rem(8),
  transition: 'background-color 250ms ease',

  ...breakpoint({ tablet: { marginTop: rem(18) } }),
});

export const middot = style({
  color: theme.color.gray.bold,
});

globalStyle(`${item}:hover ${title}`, {
  backgroundColor: theme.color.gray.hover,
});

globalStyle(`${item}:hover ${subtitle}`, {
  backgroundColor: theme.color.gray.hover,
});

globalStyle(`${item}:hover ${description}`, {
  backgroundColor: theme.color.gray.hover,
});

globalStyle(`${item}:active ${title}`, {
  backgroundColor: theme.color.border,
});

globalStyle(`${item}:active ${subtitle}`, {
  backgroundColor: theme.color.border,
});

globalStyle(`${item}:active ${description}`, {
  backgroundColor: theme.color.border,
});
