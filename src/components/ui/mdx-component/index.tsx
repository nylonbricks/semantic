'use client';

import { useMDXComponent } from 'next-contentlayer2/hooks';

type MdxComponentProps = {
  code: string;
};

export const MdxComponent = ({ code }: MdxComponentProps) => {
  const MDXComponent = useMDXComponent(code);

  return (
    <div>
      <MDXComponent />
    </div>
  );
};
