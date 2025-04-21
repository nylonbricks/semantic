import { style } from '@vanilla-extract/css';

import { rem, theme } from '@semantic/styles';

export const header = style({
  marginInline: 'auto',
  marginBottom: rem(36),
  textAlign: 'center',
  fontFamily: theme.fontFamily.mono,
});

export const title = style({
  ...theme.typography.post_title,
  marginBottom: rem(12),
  color: theme.color.gray.accent,
});

export const description = style({
  color: theme.color.gray.mid,
  fontSize: theme.fontSize.sm,
  fontWeight: 500,
});

export const section = style({
  marginBlock: rem(36),
  marginInline: 'auto',
});

export const list = style({
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fill, minmax(${rem(200)}, 1fr))`,
  gap: rem(16),
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const item = style({
  fontFamily: theme.fontFamily.mono,
  border: `${rem(1)} solid ${theme.color.background03}`,
  borderRadius: rem(8),
  backgroundColor: theme.color.background02,
  transition: 'background-color 150ms ease-in-out',

  ':hover': {
    backgroundColor: theme.color.background04,
  },
});

export const link = style({
  ...theme.layout.rowBetween,
  padding: `${rem(10)} ${rem(20)}`,
  color: theme.color.gray.accent,
  textDecoration: 'none',
  gap: rem(16),
});

export const name = style({
  fontSize: theme.fontSize.sm,
  fontWeight: 500,
});

export const count = style({
  color: theme.color.gray.mid,
  fontSize: theme.fontSize.xs,
});
