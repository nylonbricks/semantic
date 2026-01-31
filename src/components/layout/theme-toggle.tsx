"use client";

import { ClientOnly } from "@semantic/components/util";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const { resolvedTheme: theme, setTheme } = useTheme();

  return (
    <ClientOnly
      fallback={
        <div className="center h4 h-10 w-full rounded-[0.625rem] border border-[var(--color-border)] bg-[var(--color-toggle)] text-[var(--color-gray-accent)]" />
      }
    >
      <button
        aria-label="Toggle dark or light mode"
        className="center h4 h-10 w-full cursor-pointer rounded-[0.625rem] border border-[var(--color-border)] bg-[var(--color-toggle)] text-[var(--color-gray-accent)]"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        type="button"
      >
        {theme === "light" ? "🌚 Dark mode" : "🌞 Light mode"}
      </button>
    </ClientOnly>
  );
};
