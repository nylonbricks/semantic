"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type LazyImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
};

export const LazyImage = ({
  src,
  alt,
  className,
  ...props
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const handleLoad = useCallback(() => setIsLoaded(true), []);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    // biome-ignore lint/performance/noImgElement: This component intentionally uses <img> for lightweight lazy loading.
    // biome-ignore lint/correctness/useImageSize: Size is provided by the caller via props (or controlled by layout).
    // biome-ignore lint/a11y/noNoninteractiveElementInteractions: onLoad is used only to update opacity state.
    <img
      alt={alt}
      className={twMerge(
        "transition-opacity duration-500",
        isLoaded ? "opacity-100" : "opacity-0",
        className
      )}
      decoding="async"
      loading="lazy"
      onLoad={handleLoad}
      ref={imgRef}
      src={src}
      {...props}
    />
  );
};
