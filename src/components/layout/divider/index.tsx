import { clsx } from 'clsx';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

import * as styles from './styles.css';

type DividerProps = {
  className?: string;
} & ComponentPropsWithoutRef<'hr'>;

export const Divider = forwardRef<HTMLHRElement, DividerProps>(({ className, ...props }, ref) => {
  return <hr ref={ref} className={clsx(styles.divider, className)} {...props} />;
});

Divider.displayName = 'Divider';
