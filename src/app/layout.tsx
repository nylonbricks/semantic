import "@semantic/styles/globals.css";

import { METADATA } from "@semantic/constants/metadata";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { Layout } from "./_components/layout/root";

import { GeistMono, Pretendard } from "./_fonts";

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang={METADATA.SITE.LANGUAGE} suppressHydrationWarning>
    <body className={twMerge(Pretendard.variable, GeistMono.variable)}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Layout>{children}</Layout>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;

export const metadata: Metadata = {
  alternates: {
    canonical: METADATA.SITE.URL,
  },
  applicationName: METADATA.SITE.NAME,
  creator: METADATA.AUTHOR.NAME,
  description: METADATA.SITE.DESCRIPTION,
  generator: "Next.js",
  metadataBase: new URL(METADATA.SITE.URL),
  openGraph: {
    description: METADATA.SITE.DESCRIPTION,
    images: [
      {
        height: 630,
        url: METADATA.SITE.PREVIEW_IMAGE,
        width: 1200,
      },
    ],
    siteName: METADATA.SITE.NAME,
    title: METADATA.SITE.NAME,
    type: "website",
    url: METADATA.SITE.URL,
  },
  publisher: METADATA.AUTHOR.NAME,
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  title: METADATA.SITE.NAME,
  twitter: {
    card: "summary_large_image",
    description: METADATA.SITE.DESCRIPTION,
    images: [METADATA.SITE.PREVIEW_IMAGE],
    title: METADATA.SITE.NAME,
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  width: "device-width",
};
