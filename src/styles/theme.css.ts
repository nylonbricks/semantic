import { createThemeContract, createTheme, createGlobalTheme } from '@vanilla-extract/css';

import { rem } from './pxto';

const size = {
  appWidth: rem(758),
  appInlineSpace: rem(24),
  sidebarWidth: rem(210),
};

const fontFamily = {
  mono: `"Roboto Mono", pretendard, "Courier New", Courier, monospace`,
  sans: `pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif`,
};

const fontSize = {
  xxxl: rem(28),
  xxl: rem(24),
  xl: rem(20),
  lg: rem(18),
  md: rem(16),
  base: rem(15),
  sm: rem(14),
  xs: rem(12),
  xxs: rem(10),
  xxxs: rem(8),

  code: rem(12.5),
};

const typography = {
  h7: {
    fontFamily: fontFamily.mono,
    fontWeight: '500',
    fontSize: rem(10),
    lineHeight: rem(18),
  },
  h6: {
    fontFamily: fontFamily.mono,
    fontWeight: '500',
    fontSize: rem(11),
    lineHeight: rem(18),
  },
  h5: {
    fontFamily: fontFamily.mono,
    fontWeight: '500',
    fontSize: rem(12),
    lineHeight: 'auto',
  },
  h4: {
    fontFamily: fontFamily.mono,
    fontWeight: '500',
    fontSize: rem(13),
    lineHeight: 'auto',
  },
  h3: {
    fontFamily: fontFamily.mono,
    fontWeight: '500',
    fontSize: rem(15),
    lineHeight: rem(15),
  },
  post_subtitle: {
    fontFamily: fontFamily.mono,
    fontWeight: '500',
    fontSize: fontSize.base,
  },
  post_title: {
    fontFamily: fontFamily.mono,
    fontWeight: '600',
    fontSize: fontSize.xxl,
  },
  post_description: {
    fontFamily: fontFamily.mono,
    fontWeight: '500',
    fontSize: fontSize.code,
  },
  post_image_description: {
    fontFamily: fontFamily.sans,
    fontWeight: '400',
    fontSize: fontSize.base,
  },
  post_body: {
    fontFamily: fontFamily.sans,
    fontWeight: '400',
    fontSize: fontSize.base,
    lineHeight: '180%',
  },
  profile_sub: {
    fontFamily: fontFamily.mono,
    fontWeight: '500',
    fontSize: rem(11),
  },
  profile_name: {
    fontFamily: fontFamily.mono,
    fontWeight: '500',
    fontSize: rem(13),
    lineHeight: rem(13),
  },
  profile_title: {
    fontFamily: fontFamily.mono,
    fontWeight: '500',
    fontSize: rem(13),
    lineHeight: rem(20),
  },
  a: {
    fontFamily: fontFamily.mono,
    fontWeight: '500',
    fontSize: rem(14),
    lineHeight: 'auto',
  },
};

const layout = {
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerX: {
    display: 'flex',
    justifyContent: 'center',
  },
  centerY: {
    display: 'flex',
    alignItems: 'center',
  },
  rowBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  columnCenter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnCenterX: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  columnCenterY: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
};

const zIndex = {
  overlay: '100',
  headerContainer: '150',
  modal: '200',
};

export const modeColor = createThemeContract({
  gray: {
    accent: '--semantic-colors-gray-accent',
    bold: '--semantic-colors-gray-bold',
    mid: '--semantic-colors-gray-mid',
    light: '--semantic-colors-gray-light',
    click: '--semantic-colors-gray-click',
    hover: '--semantic-colors-gray-hover',
  },

  border: '--semantic-colors-border',
  background: '--semantic-colors-background',
  background02: '--semantic-colors-background02',
  background03: '--semantic-colors-background03',
  background04: '--semantic-colors-background04',
  background05: '--semantic-colors-background05',
  background06: '--semantic-colors-background06',
  background08: '--semantic-colors-background08',

  toggle: '--semantic-colors-toggle',
  license: '--semantic-colors-license',

  gradient: {
    sidebar_divider: '--semantic-gradient-sidebar-divider',
  },
});

export const color = {
  white: '#FFFFFF',
  black: '#000000',

  ...modeColor,
};

export const lightMode = createTheme(modeColor, {
  gray: {
    accent: '#1D1D30',
    bold: '#393960',
    mid: '#6B6B87',
    light: '#B5B5C3',
    click: '#6B6B87',
    hover: '#F9F9FC',
  },

  border: '#F4F4F8',
  background: '#FCFCFD',
  background02: 'rgba(0, 0, 0, 0.02)',
  background03: 'rgba(0, 0, 0, 0.03)',
  background04: 'rgba(0, 0, 0, 0.04)',
  background05: 'rgba(0, 0, 0, 0.05)',
  background06: 'rgba(0, 0, 0, 0.06)',
  background08: 'rgba(0, 0, 0, 0.08)',

  toggle: color.white,
  license: '#B5B5C3',

  gradient: {
    sidebar_divider: 'radial-gradient(circle, #D9DBE7 0%, rgba(217, 219, 231, 0) 100%)',
  },
});

export const darkMode = createTheme(modeColor, {
  gray: {
    accent: color.white,
    bold: '#DDDDDD',
    mid: '#B2B2B2',
    light: '#888888',
    click: '#1B1B1B',
    hover: '#141414',
  },

  border: '#1B1B1B',
  background: '#0F0F0F',
  background02: 'rgba(255, 255, 255, 0.02)',
  background03: 'rgba(255, 255, 255, 0.03)',
  background04: 'rgba(255, 255, 255, 0.04)',
  background05: 'rgba(255, 255, 255, 0.05)',
  background06: 'rgba(255, 255, 255, 0.06)',
  background08: 'rgba(255, 255, 255, 0.08)',

  toggle: 'rgb(1, 1, 1)',
  license: '#B2B2B2',

  gradient: {
    sidebar_divider: 'radial-gradient(circle, #36363A 0%, rgba(61, 61, 67, 0) 100%)',
  },
});

export const theme = createGlobalTheme(':root', {
  fontFamily,
  fontSize,
  typography,
  size,
  color,
  layout,
  zIndex,
});
