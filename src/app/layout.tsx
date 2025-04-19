import '@semantic/styles/global.css';

import { Metadata, Viewport } from 'next';
import { PropsWithChildren } from 'react';

import { METADATA } from '@semantic/constants/metadata';

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
