import { notFound } from 'next/navigation';

import { allPages } from '@contentlayer/generated';
import { MdxComponent } from '@semantic/components/ui';

const AboutPage = () => {
  const about = allPages.find((page) => page.slug === 'about');

  if (!about) notFound();

  return <MdxComponent code={about.body.code} />;
};

export default AboutPage;
