"use client";

import { ClientOnly } from "@semantic/components/util/client-only";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const { resolvedTheme: theme, setTheme } = useTheme();

  return (
    <ClientOnly
      fallback={
        <div className="ui-button h4 w-full text-[var(--color-gray-accent)]" />
      }
    >
      <button
        aria-label="Toggle dark or light mode"
        className="ui-button h4 w-full text-[var(--color-gray-accent)] hover:bg-[var(--color-background02)]"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        type="button"
      >
        {theme === "light" ? "🌚 Dark mode" : "🌞 Light mode"}
      </button>
    </ClientOnly>
  );
};
