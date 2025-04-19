import { makeSource } from 'contentlayer2/source-files';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkAlerts from 'remark-blockquote-alerts';

import { Page, Post } from './config/contentlayer';

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Page, Post],
  mdx: {
    remarkPlugins: [remarkAlerts],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: {
            dark: 'github-dark-dimmed',
            light: 'github-light',
          },
        },
      ],
    ],
  },
});
