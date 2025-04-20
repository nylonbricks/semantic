import { style } from '@vanilla-extract/css';

import { rem, theme } from '@semantic/styles';

export const pagination = style({
  ...theme.layout.center,
  paddingBlock: rem(28),
  gap: rem(8),
});

export const page = style({
  ...theme.layout.center,
  width: rem(32),
  height: rem(32),
  color: theme.color.gray.accent,
  fontFamily: theme.fontFamily.mono,
  fontSize: theme.fontSize.sm,
  fontWeight: 500,
  borderRadius: '50%',
  border: `${rem(1)} solid ${theme.color.border}`,
  backgroundColor: theme.color.toggle,
  transition: 'background-color 150ms ease-in-out',
  userSelect: 'none',

  ':hover': {
    backgroundColor: theme.color.background02,
  },
});

export const active = style({
  color: theme.color.background,
  borderColor: theme.color.background04,
  backgroundColor: theme.color.gray.bold,

  ':hover': {
    backgroundColor: theme.color.gray.accent,
  },
});
