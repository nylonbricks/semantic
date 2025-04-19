import { globalStyle } from '@vanilla-extract/css';

import { rem } from './pxto';
import { theme } from './theme.css';

globalStyle('[class^=blockquote-]', {
  ...theme.layout.column,
  position: 'relative',
  paddingBlock: rem(16),
  paddingRight: rem(16),
  paddingLeft: rem(50),
  border: `${rem(1)} solid`,
  borderRadius: rem(10),
  transition:
    'color 300ms cubic-bezier(0.4, 0, 0.2, 1), border-color 30ms cubic-bezier(0.4, 0, 0.2, 1), background-color 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  willChange: 'color, border-color, background-color',
});

globalStyle('[class^=blockquote-] > p', {
  padding: 0,
  margin: 0,
  fontSize: theme.fontSize.base,
  fontWeight: 500,
  wordBreak: 'keep-all',
});

globalStyle('[class^=blockquote-]::before', {
  position: 'absolute',
  content: '""',
  top: '50%',
  left: rem(16),
  width: rem(18),
  height: rem(18),
  backgroundRepeat: 'no-repeat',
  backgroundSize: `${rem(18)} ${rem(18)}`,
  backgroundPosition: 'left center',
  transform: 'translateY(-50%)',
});

// TIP
globalStyle('.blockquote-tip', {
  borderColor: 'hsl(221, 91%, 93%)',
  backgroundColor: 'hsl(208, 100%, 97%)',
});

globalStyle('.blockquote-tip > p', {
  color: 'hsl(210, 92%, 45%)',
});

globalStyle('.blockquote-tip::before', {
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='hsl(210,92%,45%)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M10.268 21a2 2 0 0 0 3.464 0'/><path d='M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326'/></svg>")`,
});

globalStyle('html[data-theme=dark] .blockquote-tip', {
  borderColor: 'hsl(223, 43%, 17%)',
  backgroundColor: 'hsl(215, 100%, 6%)',
});

globalStyle('html[data-theme=dark] .blockquote-tip > p', {
  color: 'hsl(216, 87%, 65%)',
});

globalStyle('html[data-theme=dark] .blockquote-tip::before', {
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='hsl(216,87%,65%)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M10.268 21a2 2 0 0 0 3.464 0'/><path d='M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326'/></svg>")`,
});

// NOTE
globalStyle('.blockquote-note', {
  borderColor: 'hsl(0, 0%, 93%)',
  backgroundColor: 'hsl(0, 0%, 99%)',
});

globalStyle('.blockquote-note > p', {
  color: 'hsl(0, 0%, 9%)',
});

globalStyle('.blockquote-note::before', {
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='hsl(0,0%,9%)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z'/><path d='M15 3v4a2 2 0 0 0 2 2h4'/></svg>")`,
});

globalStyle('html[data-theme=dark] .blockquote-note', {
  borderColor: 'hsl(0, 0%, 20%)',
  backgroundColor: 'hsl(0, 0%, 6%)',
});

globalStyle('html[data-theme=dark] .blockquote-note > p', {
  color: 'hsl(0, 0%, 90%)',
});

globalStyle('html[data-theme=dark] .blockquote-note::before', {
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='hsl(0,0%,90%)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z'/><path d='M15 3v4a2 2 0 0 0 2 2h4'/></svg>")`,
});

// IMPORTANT
globalStyle('.blockquote-important', {
  borderColor: 'hsl(145, 92%, 87%)',
  backgroundColor: 'hsl(143, 85%, 96%)',
});

globalStyle('.blockquote-important > p', {
  color: 'hsl(140, 100%, 27%)',
});

globalStyle('.blockquote-important::before', {
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='hsl(140,100%,27%)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M7 18v-6a5 5 0 1 1 10 0v6'/><path d='M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z'/><path d='M21 12h1'/><path d='M18.5 4.5 18 5'/><path d='M2 12h1'/><path d='M12 2v1'/><path d='m4.929 4.929.707.707'/><path d='M12 12v6'/></svg>")`,
});

globalStyle('html[data-theme=dark] .blockquote-important', {
  borderColor: 'hsl(147, 100%, 12%)',
  backgroundColor: 'hsl(150, 100%, 6%)',
});

globalStyle('html[data-theme=dark] .blockquote-important > p', {
  color: 'hsl(150, 86%, 65%)',
});

globalStyle('html[data-theme=dark] .blockquote-important::before', {
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='hsl(150,86%,65%)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M7 18v-6a5 5 0 1 1 10 0v6'/><path d='M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z'/><path d='M21 12h1'/><path d='M18.5 4.5 18 5'/><path d='M2 12h1'/><path d='M12 2v1'/><path d='m4.929 4.929.707.707'/><path d='M12 12v6'/></svg>")`,
});

// WARNING
globalStyle('.blockquote-warning', {
  borderColor: 'hsl(49, 91%, 84%)',
  backgroundColor: 'hsl(49, 100%, 97%)',
});

globalStyle('.blockquote-warning > p', {
  color: 'hsl(31, 92%, 45%)',
});

globalStyle('.blockquote-warning::before', {
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='hsl(31,92%,45%)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3'/><path d='M12 9v4'/><path d='M12 17h.01'/></svg>")`,
});

globalStyle('html[data-theme=dark] .blockquote-warning', {
  borderColor: 'hsl(60, 100%, 9%)',
  backgroundColor: 'hsl(64, 100%, 6%)',
});

globalStyle('html[data-theme=dark] .blockquote-warning > p', {
  color: 'hsl(46, 87%, 65%)',
});

globalStyle('html[data-theme=dark] .blockquote-warning::before', {
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='hsl(46,87%,65%)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3'/><path d='M12 9v4'/><path d='M12 17h.01'/></svg>")`,
});

// CAUTION
globalStyle('.blockquote-caution', {
  borderColor: 'hsl(359, 100%, 94%)',
  backgroundColor: 'hsl(359, 100%, 97%)',
});

globalStyle('.blockquote-caution > p', {
  color: 'hsl(360, 100%, 45%)',
});

globalStyle('.blockquote-caution::before', {
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='hsl(360,100%,45%)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><line x1='12' x2='12' y1='8' y2='12'/><line x1='12' x2='12.01' y1='16' y2='16'/></svg>")`,
});

globalStyle('html[data-theme=dark] .blockquote-caution', {
  borderColor: 'hsl(357, 89%, 16%)',
  backgroundColor: 'hsl(358, 76%, 10%)',
});

globalStyle('html[data-theme=dark] .blockquote-caution > p', {
  color: 'hsl(358, 100%, 81%)',
});

globalStyle('html[data-theme=dark] .blockquote-caution::before', {
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='hsl(358,100%,81%)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><line x1='12' x2='12' y1='8' y2='12'/><line x1='12' x2='12.01' y1='16' y2='16'/></svg>")`,
});
