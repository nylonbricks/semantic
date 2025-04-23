import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { allPages } from '@contentlayer/generated';
import { MdxComponent } from '@semantic/components/ui';
import { ROUTES } from '@semantic/constants';
import { generatePageMetadata } from '@semantic/utils';

const AboutPage = () => {
  const about = allPages.find((page) => page.slug === 'about');

  if (!about) notFound();

  return <MdxComponent code={about.body.code} />;
};

export default AboutPage;

export const generateMetadata = async (): Promise<Metadata> => {
  return generatePageMetadata({ title: 'About', path: ROUTES.ABOUT });
};
