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
        "relative mt-[1.875rem] h-[11.4375rem] w-full overflow-hidden rounded-[0.875rem] border border-[rgba(0,0,0,0.03)] shadow-[inset_0_-0.125rem_0.125rem_rgba(255,255,255,0.3),inset_0_0.125rem_0.125rem_rgba(255,255,255,0.3)]",
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
