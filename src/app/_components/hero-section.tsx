import { ComponentPropsWithoutRef } from 'react';

type HeroSectionProps = {
  title?: string;
  subtitle?: string;
  description?: string;
} & ComponentPropsWithoutRef<'section'>;

export const HeroSection = ({
  title,
  subtitle,
  description,
  className,
  ...props
}: HeroSectionProps) => {
  return (
    <section className={`column w-full ${className || ''}`} aria-label="Hero section" {...props}>
      <div className="relative w-full min-h-[28rem] mobile:min-h-[20rem] border border-[rgba(0,0,0,0.03)] rounded-[0.875rem] shadow-[inset_0_-0.125rem_0.125rem_rgba(255,255,255,0.3),inset_0_0.125rem_0.125rem_rgba(255,255,255,0.3)] overflow-hidden bg-[var(--color-background02)]">
        <div className="column p-[4.5rem] gap-6 items-center justify-center h-full">
          {title && (
            <h1 className="text-4xl font-bold text-[var(--color-gray-accent)] text-center">
              {title}
            </h1>
          )}
          {subtitle && (
            <h2 className="text-xl text-[var(--color-gray-bold)] text-center">{subtitle}</h2>
          )}
          {description && (
            <p className="text-base text-[var(--color-gray-mid)] text-center max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
