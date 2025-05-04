'use client';

import { ComponentProps } from 'react';

import { ClientOnly } from '@semantic/components/util';
import { formatRelativeTime } from '@semantic/utils';

type RelativeTimeProps = ComponentProps<'time'> & {
  time: string | Date;
};

export const RelativeTime = ({ time, ...props }: RelativeTimeProps) => {
  return (
    <ClientOnly>
      <time {...props}>{formatRelativeTime(time)}</time>
    </ClientOnly>
  );
};
