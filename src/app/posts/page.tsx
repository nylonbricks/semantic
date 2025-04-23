import { type Metadata } from 'next';

import { ROUTES } from '@semantic/constants';
import { generatePageMetadata } from '@semantic/utils';

import PostsPage from './p/[page]/page';

export default PostsPage;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Posts',
    path: ROUTES.POSTS,
  });
}
