import { makeSource } from 'contentlayer2/source-files';

import { Page, Post } from './config/contentlayer/schema';

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Page, Post],
  mdx: {},
});
