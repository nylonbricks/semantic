'use client';

import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type LazyImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
};

export const LazyImage = ({ src, alt, className, ...props }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className={twMerge(
        'transition-opacity duration-500',
        isLoaded ? 'opacity-100' : 'opacity-0',
        className,
      )}
      decoding="async"
      loading="lazy"
      onLoad={() => setIsLoaded(true)}
      ref={imgRef}
      src={src}
      {...props}
    />
  );
};
