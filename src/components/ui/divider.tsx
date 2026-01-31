import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type DividerProps = {
  className?: string;
} & ComponentPropsWithoutRef<"hr">;

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ className, ...props }, ref) => {
    return (
      <hr
        className={twMerge("h-[0.03125rem] w-full border-none", className)}
        ref={ref}
        style={{ background: "var(--color-gradient-sidebar-divider)" }}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";
