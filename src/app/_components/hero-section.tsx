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
      <div className="relative w-full overflow-hidden">
        <div className="column py-12 max-[426px]:py-8 gap-6 max-[426px]:gap-6 items-start justify-center max-[426px]:min-h-[16rem]">
          {(title || subtitle) && (
            <div className="column gap-4 max-[426px]:gap-3">
              {title && (
                <h1
                  className="text-6xl tablet:text-7xl max-[768px]:text-4xl max-[426px]:text-4xl text-[var(--color-gray-accent)] leading-[1.1]"
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontWeight: 500,
                    letterSpacing: '-0.05em',
                  }}
                >
                  {title}
                </h1>
              )}
              {subtitle && (
                <h2 className="text-3xl tablet:text-4xl max-[768px]:text-lg max-[426px]:text-lg font-normal text-[var(--color-gray-accent)] leading-[1.4]">
                  {subtitle}
                </h2>
              )}
            </div>
          )}
          {description && (
            <p className="text-xl max-[426px]:text-sm text-[var(--color-gray-mid)] leading-relaxed max-w-3xl font-normal whitespace-pre-line">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
