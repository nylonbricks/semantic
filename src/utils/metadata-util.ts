import { METADATA } from "@semantic/constants/metadata";
import type { Metadata } from "next";

interface GeneratePageMetadataParams {
  description?: string;
  image?: string;
  openGraph?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
  };
  path?: string;
  title?: string;
  type?: "website" | "article";
}

export const generatePageMetadata = ({
  title = METADATA.SITE.NAME,
  description = METADATA.SITE.DESCRIPTION,
  path = "",
  image = METADATA.SITE.PREVIEW_IMAGE,
  type = "website",
  openGraph,
}: GeneratePageMetadataParams): Metadata => {
  const url = `${METADATA.SITE.URL}${path}`;

  return {
    alternates: {
      canonical: url,
    },
    applicationName: METADATA.SITE.NAME,
    creator: METADATA.AUTHOR.NAME,
    description,
    generator: "Next.js",
    metadataBase: new URL(METADATA.SITE.URL),
    openGraph: {
      description,
      images: [
        {
          height: 630,
          url: image,
          width: 1200,
        },
      ],
      siteName: METADATA.SITE.NAME,
      title:
        title === METADATA.SITE.NAME
          ? title
          : `${title} - ${METADATA.SITE.NAME}`,
      type,
      url,
      ...(type === "article" &&
        openGraph && {
          authors: openGraph.authors,
          modifiedTime: openGraph.modifiedTime,
          publishedTime: openGraph.publishedTime,
          tags: openGraph.tags,
        }),
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
    title:
      title === METADATA.SITE.NAME ? title : `${title} - ${METADATA.SITE.NAME}`,
    twitter: {
      card: "summary_large_image",
      description,
      images: [image],
      title:
        title === METADATA.SITE.NAME
          ? title
          : `${title} - ${METADATA.SITE.NAME}`,
    },
  };
};
