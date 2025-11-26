import { Roboto_Mono } from 'next/font/google';

export const RobotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  variable: '--font-roboto-mono',
  preload: true,
});
