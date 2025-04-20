import { style } from '@vanilla-extract/css';

import { rem, theme } from '@semantic/styles';

export const root = style({
  ...theme.layout.centerY,
  ...theme.typography.h3,
  width: 'fit-content',
  paddingBlock: rem(5),
  paddingRight: rem(9),
  color: theme.color.gray.accent,
  userSelect: 'none',
  gap: rem(8),
  opacity: 1,
  transition: 'opacity 150ms ease-in-out',

  ':hover': { opacity: 0.7 },
});
