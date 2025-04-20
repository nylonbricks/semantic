import './reset.css';
import './animation.css';
import './blockquote.css';
import './code-highlight.css';

import { globalStyle } from '@vanilla-extract/css';

import { theme } from './theme.css';

globalStyle('body', {
  paddingInline: theme.size.appInlineSpace,
  paddingBottom: 'env(safe-area-inset-bottom)',
  fontFamily: theme.fontFamily.sans,
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
  WebkitTextSizeAdjust: '100%',
  MozOsxFontSmoothing: 'grayscale',
  overflowX: 'hidden',
  overflowY: 'scroll',
  backgroundColor: theme.color.background,
});

globalStyle('[data-theme="light"]', {
  colorScheme: 'light',
});

globalStyle('[data-theme="dark"]', {
  colorScheme: 'dark',
});
