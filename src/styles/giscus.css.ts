import { style } from '@vanilla-extract/css';

import { rem, theme } from '@semantic/styles/index';

export const input = style({
  border: `${rem(1)} solid ${theme.color.border}`,
});
