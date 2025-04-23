import { type Metadata } from 'next';

import { METADATA } from '@semantic/constants';

type GeneratePageMetadataParams = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  openGraph?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
  };
};

export const generatePageMetadata = ({
  title = METADATA.SITE.NAME,
  description = METADATA.SITE.DESCRIPTION,
  path = '',
  image = METADATA.SITE.PREVIEW_IMAGE,
  type = 'website',
  openGraph,
}: GeneratePageMetadataParams): Metadata => {
  const url = `${METADATA.SITE.URL}${path}`;

  return {
    title: title === METADATA.SITE.NAME ? title : `${title} - ${METADATA.SITE.NAME}`,
    description,
    metadataBase: new URL(METADATA.SITE.URL),
    openGraph: {
      title: title === METADATA.SITE.NAME ? title : `${title} - ${METADATA.SITE.NAME}`,
      description,
      url,
      siteName: METADATA.SITE.NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
      type,
      ...(type === 'article' &&
        openGraph && {
          publishedTime: openGraph.publishedTime,
          modifiedTime: openGraph.modifiedTime,
          authors: openGraph.authors,
          tags: openGraph.tags,
        }),
    },
    twitter: {
      card: 'summary_large_image',
      title: title === METADATA.SITE.NAME ? title : `${title} - ${METADATA.SITE.NAME}`,
      description,
      images: [image],
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
      canonical: url,
    },
    generator: 'Next.js',
    applicationName: METADATA.SITE.NAME,
    creator: METADATA.AUTHOR.NAME,
    publisher: METADATA.AUTHOR.NAME,
  };
};
