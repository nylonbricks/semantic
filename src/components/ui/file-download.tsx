'use client';

import { AnimatePresence, motion } from 'motion/react';
import { ComponentProps, useState } from 'react';

type FileDownloadProps = {
  fileKey: string;
  children: React.ReactNode;
  type?: 'default' | 'pdf';
} & Omit<ComponentProps<'a'>, 'href' | 'onClick'>;

export const FileDownload = ({
  fileKey,
  children,
  type = 'default',
  ...props
}: FileDownloadProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch(`/api/r2/presign?key=${encodeURIComponent(fileKey)}`);
      if (!response.ok) {
        throw new Error('Failed to get download URL');
      }

      const data = await response.json();
      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Download failed:', error);
      // Optional: Add toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className="flex items-center justify-center w-full tablet:w-fit px-4 py-3 border border-[var(--color-border)] rounded-xl bg-[var(--color-background)] hover:bg-[var(--color-gray-hover)] transition-colors duration-200 cursor-pointer no-underline relative overflow-hidden min-h-[52px] min-w-[280px]"
      {...props}
    >
      {/* Default Content - Keeps height fixed */}
      <div
        className={`flex items-center justify-between w-full gap-3 transition-opacity duration-200 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{type === 'pdf' ? '📄' : '📎'}</span>
          <span className="font-medium text-[var(--color-gray-bold)]">{children}</span>
        </div>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[var(--color-gray-mid)]"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.7761 3 12 3.22386 12 3.5L12 9C12 9.27614 11.7761 9.5 11.5 9.5C11.2239 9.5 11 9.27614 11 9L11 4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center gap-3 bg-[var(--color-background)]"
          >
            <div className="relative w-5 h-5 animate-spin">
              <svg className="w-full h-full" viewBox="0 0 24 24">
                <circle
                  className="text-[var(--color-border)]"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="transparent"
                  r="10"
                  cx="12"
                  cy="12"
                />
                <circle
                  className="text-[var(--color-primary)]"
                  strokeWidth="3"
                  strokeDasharray={15}
                  strokeDashoffset={15}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="10"
                  cx="12"
                  cy="12"
                />
              </svg>
            </div>
            <span className="font-medium text-[var(--color-gray-bold)] text-sm">
              파일을 여는 중이에요...
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </a>
  );
};
