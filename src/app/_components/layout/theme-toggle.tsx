"use client";

import { ClientOnly } from "@semantic/components/util/client-only";
import { useTheme } from "next-themes";
import { useCallback } from "react";

export const ThemeToggle = () => {
  const { resolvedTheme: theme, setTheme } = useTheme();

  const handleToggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  return (
    <ClientOnly
      fallback={
        <div className="ui-button h4 w-full text-[var(--color-gray-accent)]" />
      }
    >
      <button
        aria-label="Toggle dark or light mode"
        className="ui-button h4 w-full text-[var(--color-gray-accent)] hover:bg-[var(--color-background02)]"
        onClick={handleToggleTheme}
        type="button"
      >
        {theme === "light" ? "🌚 Dark mode" : "🌞 Light mode"}
      </button>
    </ClientOnly>
  );
};
