import { ROUTES } from "@semantic/constants/menu";
import { METADATA, POST } from "@semantic/constants/metadata";
import { getAllPosts } from "@semantic/utils/post-util";
import { slugify } from "@semantic/utils/text-util";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const generateSitemapUrls = async (): Promise<MetadataRoute.Sitemap> => {
  const posts = await getAllPosts();
  const postsPageCount = Math.ceil(posts.length / POST.PER_PAGE);

  const categoryCountMap = posts.reduce<Record<string, number>>(
    (map, { category }) => {
      map[category] = (map[category] || 0) + 1;
      return map;
    },
    {}
  );

  const categoryUrls = Object.entries(categoryCountMap).flatMap(
    ([category, count]) => {
      const categorySlug = slugify(category);
      const categoryPages = Math.ceil(count / POST.PER_PAGE);
      return [
        { url: `${METADATA.SITE.URL}${ROUTES.CATEGORIES}/${categorySlug}` },
        ...Array.from({ length: categoryPages }, (_, pageIndex) => ({
          url: `${METADATA.SITE.URL}${ROUTES.CATEGORIES}/${categorySlug}/p/${pageIndex + 1}`,
        })),
      ];
    }
  );

  const tagCountMap = posts.reduce<Record<string, number>>((map, { tags }) => {
    for (const tag of tags ?? []) {
      map[tag] = (map[tag] || 0) + 1;
    }
    return map;
  }, {});

  const tagUrls = Object.entries(tagCountMap).flatMap(([tag, count]) => {
    const tagSlug = slugify(tag);
    const tagPages = Math.ceil(count / POST.PER_PAGE);
    return [
      { url: `${METADATA.SITE.URL}${ROUTES.TAGS}/${tagSlug}` },
      ...Array.from({ length: tagPages }, (_, pageIndex) => ({
        url: `${METADATA.SITE.URL}${ROUTES.TAGS}/${tagSlug}/p/${pageIndex + 1}`,
      })),
    ];
  });

  return [
    { url: `${METADATA.SITE.URL}${ROUTES.ABOUT}` },
    { url: `${METADATA.SITE.URL}${ROUTES.CATEGORIES}` },
    { url: `${METADATA.SITE.URL}${ROUTES.TAGS}` },
    { url: `${METADATA.SITE.URL}${ROUTES.POSTS}` },
    ...categoryUrls,
    ...tagUrls,
    ...Array.from({ length: postsPageCount }, (_, pageIndex) => ({
      url: `${METADATA.SITE.URL}${ROUTES.POSTS}/p/${pageIndex + 1}`,
    })),
    ...posts.map(({ slug, modifiedAt, createdAt }) => ({
      url: `${METADATA.SITE.URL}${ROUTES.POSTS}/${slug}`,
      lastModified: modifiedAt ?? createdAt,
      changeFrequency: "monthly",
      priority: 0.9,
    })),
  ];
};

const sitemapToXml = (
  urls: MetadataRoute.Sitemap
): string => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (item) => `
  <url>
    <loc>${item.url}</loc>
    ${
      item.lastModified
        ? `<lastmod>${
            item.lastModified instanceof Date
              ? item.lastModified.toISOString()
              : new Date(item.lastModified).toISOString()
          }</lastmod>`
        : ""
    }
    ${item.changeFrequency ? `<changefreq>${item.changeFrequency}</changefreq>` : ""}
    ${item.priority ? `<priority>${item.priority}</priority>` : ""}
  </url>`
  )
  .join("")}
</urlset>`;

export const GET = async (): Promise<Response> => {
  const urls = await generateSitemapUrls();
  const xml = sitemapToXml(urls);
  return new Response(xml, {
    headers: { "Content-Type": "text/xml; charset=utf-8" },
  });
};
