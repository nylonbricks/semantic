import { globalStyle, keyframes } from '@vanilla-extract/css';

import { rem } from './pxto';

const enter = keyframes({
  '0%': { opacity: '0', transform: `translateY(${rem(4)})` },
  '100%': { opacity: '1', transform: 'none' },
});

globalStyle('[data-animate] > *', {
  vars: {
    '--stagger': '0',
    '--delay': '150ms',
    '--start': '0ms',
  },
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animation: `${enter} 500ms both`,
      animationDelay: 'calc(var(--stagger) * var(--delay) + var(--start))',
    },
  },
});

for (let i = 1; i <= 20; i++) {
  globalStyle(`[data-animate] > *:nth-child(${i})`, {
    vars: { '--stagger': `${i}` },
  });
}

globalStyle('[data-animation-controller=false] [data-animate]', {
  animation: 'none',
});
