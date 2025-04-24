import { type ReactNode } from 'react';

import { useIsClient } from './hooks';

export type ClientOnlyProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export const ClientOnly = ({ children, fallback }: ClientOnlyProps) => (
  <>{useIsClient() ? children : fallback}</>
);
