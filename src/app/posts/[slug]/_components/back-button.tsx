"use client";

import { ChevronLeftIcon } from "@semantic/components/icon";
import { usePathname, useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    if (pathname === "/") {
      router.back();
      return;
    }

    const path: string[] = pathname.split("/").filter(Boolean);
    if (path.length > 1) {
      const parent = `/${path.slice(0, -1).join("/")}`;
      router.replace(parent);
    } else {
      router.replace("/");
    }
  };

  return (
    <button
      aria-label="Go back"
      className="center-y h3 w-fit cursor-pointer select-none gap-[0.5rem] py-[0.3125rem] pr-[0.5625rem] text-[var(--color-gray-accent)] opacity-100 transition-opacity duration-150 ease-in-out hover:opacity-70"
      onClick={handleBack}
      type="button"
    >
      <ChevronLeftIcon size={18} />
      <span>Back</span>
    </button>
  );
};
