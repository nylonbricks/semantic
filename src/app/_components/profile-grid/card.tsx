import { ComponentPropsWithoutRef, ElementType, ReactNode, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type CardProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { as: Component = 'div', className, children, ...props },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={twMerge(
        'relative w-full h-[11.4375rem] mt-[1.875rem] border border-[rgba(0,0,0,0.03)] rounded-[0.875rem] shadow-[inset_0_-0.125rem_0.125rem_rgba(255,255,255,0.3),inset_0_0.125rem_0.125rem_rgba(255,255,255,0.3)] overflow-hidden',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

type CardContentProps = {
  gap?: number | string;
} & ComponentPropsWithoutRef<'div'>;

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(function CardContent(
  { children, gap = 0, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={twMerge('row-between w-full h-full p-[1.875rem]', className)}
      style={{ gap }}
      {...props}
    >
      {children}
    </div>
  );
});

export default Object.assign({}, { Root: Card, Content: CardContent });
