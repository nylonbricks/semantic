import dayjs from 'dayjs';

import { allPosts } from '@contentlayer/generated';
import { METADATA, ROUTES } from '@semantic/constants';
import { slugify } from '@semantic/utils';

export const dynamic = 'force-static';
export const revalidate = false;

const generateRssItems = (): {
  title: string;
  link: string;
  slug: string;
  description: string;
  pubDate: string;
}[] =>
  allPosts
    .sort((a, b) => (dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1))
    .map(({ title, slug, body, modifiedAt, createdAt }) => {
      const date = modifiedAt ?? createdAt;
      const pubDate = dayjs(date).toDate().toUTCString();
      const description = body.raw.replace(/^\s*(import|export)\s.*$/gm, '').trim();

      return {
        title,
        link: `${METADATA.SITE.URL}${ROUTES.POSTS}/${slugify(slug)}`,
        slug: slugify(slug),
        description,
        pubDate,
      };
    });

const rssToXml = (
  items: ReturnType<typeof generateRssItems>,
): string => `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title><![CDATA[${METADATA.SITE.NAME}]]></title>
    <link>${METADATA.SITE.URL}</link>
    <description><![CDATA[${METADATA.SITE.DESCRIPTION}]]></description>
    <language><![CDATA[${METADATA.SITE.LANGUAGE}]]></language>
    <pubDate>${dayjs().toDate().toUTCString()}</pubDate>
    <generator>semantic</generator>
    <ttl>100</ttl>
    <image>
      <url>${METADATA.SITE.PREVIEW_IMAGE}</url>
      <title><![CDATA[${METADATA.SITE.NAME}]]></title>
      <link>${METADATA.SITE.URL}</link>
    </image>
${items
  .map(
    ({ title, link, slug, description, pubDate }) => `
    <item>
      <title><![CDATA[${title}]]></title>
      <link>${link}</link>
      <description><![CDATA[${description}]]></description>
      <guid isPermaLink="true">${slug}</guid>
      <pubDate>${pubDate}</pubDate>
    </item>`,
  )
  .join('')}
  </channel>
</rss>`;

export const GET = async (): Promise<Response> => {
  const items = generateRssItems();
  const xml = rssToXml(items);
  return new Response(xml, {
    headers: { 'Content-Type': 'text/xml; charset=utf-8' },
  });
};
