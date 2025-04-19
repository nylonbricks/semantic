import { globalStyle, style } from '@vanilla-extract/css';

import { rem, theme } from '@semantic/styles';

export const root = style({
  ...theme.layout.column,
  gap: rem(18),
});

export const h2 = style({
  fontSize: theme.fontSize.lg,
  fontWeight: 600,
  paddingTop: rem(48),
});

export const h3 = style({
  ...theme.typography.h3,
  paddingTop: rem(36),
});

export const h4 = style({
  ...theme.typography.h4,
  paddingTop: rem(24),
});

export const h5 = style({
  ...theme.typography.h5,
  paddingTop: rem(24),
});

export const h6 = style({
  ...theme.typography.h6,
  paddingTop: rem(24),
});

globalStyle(`:is(${h2}, ${h3}, ${h4}, ${h5}, ${h6})`, {
  color: theme.color.gray.accent,
  scrollMarginTop: rem(67),
});

export const p = style({
  ...theme.typography.post_body,
  color: theme.color.gray.accent,
});

export const image = style({
  position: 'relative',
  display: 'inline-block',
  width: '100%',
  border: `${rem(1)} solid ${theme.color.border}`,
  borderRadius: rem(14),
  overflow: 'hidden',
});

globalStyle(`${image} img`, {
  width: '100%',
  height: 'auto',
  objectFit: 'contain',
});

globalStyle(`${root} ol`, {
  counterReset: 'basics-ol',
});

globalStyle(`${root} :is(ul, ol) li`, {
  position: 'relative',
  paddingLeft: rem(16),
  paddingBottom: rem(8),
  color: theme.color.gray.accent,
  fontSize: theme.fontSize.base,
  lineHeight: 1.8,
  listStyle: 'none',
});

globalStyle(`${root} ol li::before`, {
  content: `counter(basics-ol) ". "`,
  counterIncrement: 'basics-ol',
  position: 'absolute',
  left: 0,
  color: theme.color.gray.mid,
  fontSize: theme.fontSize.base,
});

globalStyle(`${root} ul li::before`, {
  content: '•',
  position: 'absolute',
  left: 0,
  color: theme.color.gray.mid,
  fontSize: theme.fontSize.base,
});

globalStyle(`${root} p > code`, {
  paddingBlock: rem(3),
  paddingInline: rem(6),
  color: theme.color.gray.accent,
  fontFamily: theme.fontFamily.mono,
  fontSize: theme.fontSize.code,
  fontWeight: 500,
  lineHeight: 1.8,
  border: `${rem(1)} solid ${theme.color.border}`,
  borderRadius: rem(4),
  backgroundColor: theme.color.toggle,
});
