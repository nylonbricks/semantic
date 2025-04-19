import { makeSource } from 'contentlayer2/source-files';

import { Page, Post } from './config/contentlayer';

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Page, Post],
  mdx: {},
});
