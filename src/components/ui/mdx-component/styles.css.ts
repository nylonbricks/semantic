import { globalStyle, style } from '@vanilla-extract/css';

import { darkMode, rem, theme } from '@semantic/styles';

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
  fontSize: theme.fontSize.md,
  paddingTop: rem(36),
});

globalStyle(`${root} :is(h4, h5, h6)`, {
  fontSize: theme.fontSize.base,
  paddingTop: rem(24),
});

globalStyle(`${root} :is(h2, h3, h4, h5, h6)`, {
  color: theme.color.gray.accent,
  fontWeight: 600,
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

export const blockquote = style({
  ...theme.layout.column,
  padding: rem(16),
  border: `${rem(1)} solid ${theme.color.background04}`,
  borderRadius: rem(10),
  backgroundColor: theme.color.background02,
});

globalStyle(`${root} a`, {
  color: theme.color.gray.bold,
  textDecoration: 'none',
  lineHeight: 1.8,
  borderBottom: `${rem(1)} solid ${theme.color.background06}`,
  opacity: 1,
  transition: 'opacity 150ms ease-in-out',
});

globalStyle(`${root} a:hover`, {
  opacity: 0.7,
});

globalStyle(`${root} a[target="_blank"]::after`, {
  display: 'inline-block',
  width: rem(12),
  height: rem(12),
  margin: 0,
  content: '',
  background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23393960" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});

globalStyle(`${darkMode} ${root} a[target="_blank"]::after`, {
  background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23DDDDDD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});

globalStyle(`${root} strong`, {
  fontWeight: 600,
});
