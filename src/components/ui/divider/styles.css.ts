import { style } from '@vanilla-extract/css';

import { rem, theme } from '@semantic/styles';

export const divider = style({
  width: '100%',
  height: rem(0.5),
  border: 'none',
  background: theme.color.gradient.sidebar_divider,
});
