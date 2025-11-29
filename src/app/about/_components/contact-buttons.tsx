'use client';

import { GithubIcon, LinkedInIcon, MailIcon, PhoneIcon } from '@semantic/components/icon';
import { useToast } from '@semantic/components/ui';

export const ContactButtons = () => {
  const { showToast } = useToast();

  const handleCopy = async (text: string, type: 'phone' | 'email') => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(
        type === 'phone' ? '전화번호를 클립보드에 복사했어요' : '메일 주소를 클립보드에 복사했어요',
      );
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="grid grid-cols-2 tablet:grid-cols-4 gap-2 w-full mt-6">
      <button
        type="button"
        onClick={() => handleCopy('+821048119233', 'phone')}
        className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] hover:bg-[var(--color-gray-hover)] transition-colors cursor-pointer"
        aria-label="Copy phone number"
      >
        <PhoneIcon size={20} />
        <span className="text-sm font-medium text-[var(--color-gray-bold)]">+821048119233</span>
      </button>
      <button
        type="button"
        onClick={() => handleCopy('hello@stile.im', 'email')}
        className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] hover:bg-[var(--color-gray-hover)] transition-colors cursor-pointer"
        aria-label="Copy email address"
      >
        <MailIcon size={20} />
        <span className="text-sm font-medium text-[var(--color-gray-bold)]">hello@stile.im</span>
      </button>
      <a
        href="https://www.linkedin.com/in/kwonroh/"
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] hover:bg-[var(--color-gray-hover)] transition-colors"
        aria-label="LinkedIn"
      >
        <LinkedInIcon size={20} />
        <span className="text-sm font-medium text-[var(--color-gray-bold)]">kwonroh</span>
      </a>
      <a
        href="https://github.com/sepowered"
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] hover:bg-[var(--color-gray-hover)] transition-colors"
        aria-label="GitHub"
      >
        <GithubIcon size={20} />
        <span className="text-sm font-medium text-[var(--color-gray-bold)]">@sepowered</span>
      </a>
    </div>
  );
};
