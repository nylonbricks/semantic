import {
  type ComponentPropsWithoutRef,
  type ElementType,
  forwardRef,
  type ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";

type CardProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<"div">;

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { as: Component = "div", className, children, ...props },
  ref
) {
  return (
    <Component
      className={twMerge(
        "ui-card relative mt-[1.875rem] h-[11.4375rem] w-full overflow-hidden",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </Component>
  );
});

type CardContentProps = {
  gap?: number | string;
} & ComponentPropsWithoutRef<"div">;

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent({ children, gap = 0, className, ...props }, ref) {
    return (
      <div
        className={twMerge("row-between h-full w-full p-[1.875rem]", className)}
        ref={ref}
        style={{ gap }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export default { Root: Card, Content: CardContent };
