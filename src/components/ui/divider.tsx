import { clsx } from 'clsx';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

type DividerProps = {
  className?: string;
} & ComponentPropsWithoutRef<'hr'>;

export const Divider = forwardRef<HTMLHRElement, DividerProps>(({ className, ...props }, ref) => {
  return (
    <hr
      ref={ref}
      className={clsx('w-full h-[0.03125rem] border-none', className)}
      style={{ background: 'var(--color-gradient-sidebar-divider)' }}
      {...props}
    />
  );
});

Divider.displayName = 'Divider';
