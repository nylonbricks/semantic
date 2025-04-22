import '@semantic/styles/global.css';

import clsx from 'clsx';
import { Metadata, Viewport } from 'next';
import { Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { ThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

import { Layout } from '@semantic/components/layout';
import { METADATA } from '@semantic/constants';
import { darkMode, lightMode } from '@semantic/styles';

const pretendard = localFont({
  src: './_fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  preload: true,
  variable: '--font-pretendard',
});

const roboto = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  preload: true,
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: METADATA.SITE.NAME,
  description: METADATA.SITE.DESCRIPTION,
  metadataBase: new URL(METADATA.SITE.URL),
  openGraph: {
    title: METADATA.SITE.NAME,
    description: METADATA.SITE.DESCRIPTION,
    url: METADATA.SITE.URL,
    siteName: METADATA.SITE.NAME,
    images: [
      {
        url: METADATA.SITE.PREVIEW_IMAGE,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: METADATA.SITE.NAME,
    description: METADATA.SITE.DESCRIPTION,
    images: [METADATA.SITE.PREVIEW_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: METADATA.SITE.URL,
  },
  generator: 'Next.js',
  applicationName: METADATA.SITE.NAME,
  creator: METADATA.AUTHOR.NAME,
  publisher: METADATA.AUTHOR.NAME,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(roboto.variable, pretendard.variable)}>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          value={{
            light: lightMode,
            dark: darkMode,
          }}
          storageKey="semantic-theme"
        >
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
