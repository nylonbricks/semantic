import { globalStyle, style } from '@vanilla-extract/css';

import { rem, theme } from '@semantic/styles';

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
