'use client';

import { usePathname, useRouter } from 'next/navigation';

import { ChevronLeftIcon } from '@semantic/components/icon';

export const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    if (pathname === '/') {
      router.back();
      return;
    }

    const path: string[] = pathname.split('/').filter(Boolean);
    if (path.length > 1) {
      const parent = `/${path.slice(0, -1).join('/')}`;
      router.replace(parent);
    } else {
      router.replace('/');
    }
  };

  return (
    <button
      onClick={handleBack}
      aria-label="Go back"
      className="center-y h3 w-fit py-[0.3125rem] pr-[0.5625rem] text-[var(--color-gray-accent)] cursor-pointer select-none gap-[0.5rem] opacity-100 transition-opacity duration-150 ease-in-out hover:opacity-70"
    >
      <ChevronLeftIcon size={18} />
      <span>프로젝트 목록으로</span>
    </button>
  );
};
