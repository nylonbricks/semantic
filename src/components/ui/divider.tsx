import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type DividerProps = {
  className?: string;
} & ComponentPropsWithoutRef<'hr'>;

export const Divider = forwardRef<HTMLHRElement, DividerProps>(({ className, ...props }, ref) => {
  return (
    <hr
      ref={ref}
      className={twMerge('w-full h-[0.03125rem] border-none', className)}
      style={{ background: 'var(--color-gradient-sidebar-divider)' }}
      {...props}
    />
  );
});

Divider.displayName = 'Divider';
