import { style } from '@vanilla-extract/css';

import { rem, theme } from '@semantic/styles';

export const themeToggle = style({
  ...theme.layout.center,
  ...theme.typography.h4,
  width: '100%',
  height: rem(40),
  color: theme.color.gray.accent,
  border: `${rem(1)} solid ${theme.color.border}`,
  borderRadius: rem(10),
  backgroundColor: theme.color.toggle,
});
