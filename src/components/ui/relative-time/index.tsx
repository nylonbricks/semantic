'use client';

import { ComponentProps } from 'react';

import { formatRelativeTime } from '@semantic/utils';

type RelativeTimeProps = ComponentProps<'time'> & {
  time: string | Date;
};

export const RelativeTime = ({ time, ...props }: RelativeTimeProps) => {
  return <time {...props}>{formatRelativeTime(time)}</time>;
};
