import { style } from '@vanilla-extract/css';

import { rem, theme } from '@semantic/styles';

export const title = style({
  ...theme.typography.h3,
  marginBottom: rem(30),
  color: theme.color.gray.light,
});
