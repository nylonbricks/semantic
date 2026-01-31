import { Divider } from "@semantic/components/ui";
import { METADATA, ROUTES } from "@semantic/constants";
import dayjs from "dayjs";
import Link from "next/link";

import { NavigateMenu } from "./navigate-menu";
import { ThemeToggle } from "./theme-toggle";

export const Sidebar = () => {
  return (
    <aside
      aria-label="Sidebar navigation"
      className="fixed top-0 left-0 tablet:flex hidden h-[100dvh] w-[var(--spacing-sidebar)] flex-col justify-between px-[2.5rem] py-[2.75rem]"
    >
      <div className="column w-full gap-[1.5625rem]">
        <Link
          className="h3 user-select-none break-keep px-[0.625rem] py-[0.78125rem] text-[var(--color-gray-accent)]"
          href={ROUTES.HOME}
        >
          {METADATA.SITE.NAME}
        </Link>
        <Divider />
        <nav>
          <NavigateMenu />
        </nav>
      </div>

      <div className="column w-full gap-[1.25rem]">
        <ThemeToggle />
        <p className="h6 w-full text-[var(--color-license)]">
          Copyright © {dayjs().year()} {METADATA.AUTHOR.NAME}, All rights
          reserved.
        </p>
      </div>
    </aside>
  );
};
