import { globalStyle, keyframes, style } from '@vanilla-extract/css';

import { breakpoint, rem, theme } from '@semantic/styles';

const slideDown = keyframes({
  from: { height: '0' },
  to: { height: 'var(--radix-accordion-content-height)' },
});

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: '0' },
});

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  backdropFilter: `blur(${rem(11)})`,
  zIndex: theme.zIndex.overlay,
});

export const root = style({
  position: 'fixed',
  display: 'flex',
  top: 0,
  left: 0,
  width: '100%',
  paddingInline: theme.size.appInlineSpace,
  backgroundColor: theme.color.background,
  zIndex: theme.zIndex.headerContainer,

  ...breakpoint({ tablet: { display: 'none' } }),
});

export const inner = style({
  ...theme.layout.rowBetween,
  width: '100%',
  maxWidth: theme.size.appWidth,
  paddingBlock: rem(13),
  marginInline: 'auto',
});

export const branding = style({
  color: theme.color.gray.mid,
  fontFamily: theme.fontFamily.mono,
  fontWeight: 500,
  fontSize: rem(15),
  lineHeight: 'auto',
});

export const menu = style({
  ...theme.layout.center,
  height: rem(40),
  paddingBlock: rem(11),
  paddingInline: rem(15),
  color: theme.color.gray.mid,
  fontFamily: theme.fontFamily.mono,
  fontWeight: 500,
  fontSize: rem(13),
  lineHeight: rem(18),
  border: `${rem(1)} solid ${theme.color.border}`,
  borderRadius: rem(10),
  backgroundColor: theme.color.toggle,
});

export const menuContainer = style({
  marginTop: rem(1),
  overflow: 'hidden',
});

export const menuContent = style({
  position: 'fixed',
  top: rem(67),
  left: 0,
  width: '100%',
  paddingInline: theme.size.appInlineSpace,
  backgroundColor: theme.color.background,
  overflow: 'hidden',
});

globalStyle(`${menuContent}[data-state="open"]`, {
  animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
});

globalStyle(`${menuContent}[data-state="closed"]`, {
  animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
});

export const menuContentInner = style({
  ...theme.layout.column,
  width: '100%',
  maxWidth: theme.size.appWidth,
  paddingTop: rem(25),
  paddingBottom: rem(19),
  marginInline: 'auto',
});

export const menuContentNavigation = style({
  ...theme.layout.column,
  width: '100%',
  maxWidth: rem(122),
  gap: rem(30),
});

export const dividerContainer = style({
  display: 'block',
  paddingTop: rem(67),

  ...breakpoint({ tablet: { display: 'none' } }),
});

export const license = style({
  ...theme.typography.h7,
  width: '100%',
  marginTop: rem(43),
  color: theme.color.license,
  textAlign: 'center',
});
