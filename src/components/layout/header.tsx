"use client";

// biome-ignore lint/performance/noNamespaceImport: Radix Accordion namespace import is used for readability.
import * as Accordion from "@radix-ui/react-accordion";
import { Divider } from "@semantic/components/ui/divider";
import { ROUTES } from "@semantic/constants/menu";
import { METADATA } from "@semantic/constants/metadata";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";

import { NavigateMenu } from "./navigate-menu";
import { ThemeToggle } from "./theme-toggle";

export const Header = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  const overlayClassName =
    "fixed inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-[11px] z-[var(--z-overlay)] transition-opacity duration-300";

  return (
    <>
      <Accordion.Root
        collapsible
        type="single"
        value={accordionOpen ? "menu" : ""}
      >
        <button
          aria-label="Close menu"
          className={
            accordionOpen
              ? `${overlayClassName} opacity-100`
              : `${overlayClassName} pointer-events-none opacity-0`
          }
          onClick={() => setAccordionOpen(false)}
          type="button"
        />

        <header className="fixed top-0 left-0 z-[var(--z-header)] flex tablet:hidden w-full bg-[var(--color-background)] px-[var(--spacing-inline)]">
          <div className="row-between mx-auto w-full max-w-[var(--app-width)] py-[0.8125rem]">
            <Link
              className="font-medium font-mono text-[0.9375rem] text-[var(--color-gray-mid)] leading-[auto]"
              href={ROUTES.HOME}
            >
              {METADATA.SITE.NAME}
            </Link>

            <Accordion.Item
              aria-label="Menu Accordion"
              className="mt-[1px] overflow-hidden"
              id="menu-accordion-item"
              value="menu"
            >
              <button
                aria-controls="menu-accordion-content"
                aria-expanded={accordionOpen}
                className="center h-10 cursor-pointer rounded-[0.625rem] border border-[var(--color-border)] bg-[var(--color-toggle)] px-[0.9375rem] py-[0.6875rem] font-medium font-mono text-[0.8125rem] text-[var(--color-gray-mid)] leading-[1.125rem]"
                onClick={() => setAccordionOpen((open) => !open)}
                type="button"
              >
                {accordionOpen ? "-" : "menu"}
              </button>
              <Accordion.Content
                aria-labelledby="menu-accordion-item"
                className="fixed top-[4.1875rem] left-0 w-full overflow-hidden bg-[var(--color-background)] px-[var(--spacing-inline)]"
                id="menu-accordion-content"
              >
                <div className="column mx-auto w-full max-w-[var(--app-width)] pt-[1.5625rem] pb-[1.1875rem]">
                  <div className="column w-full max-w-[122px] gap-[1.875rem]">
                    <NavigateMenu />
                    <ThemeToggle />
                  </div>
                  <p className="h7 mt-[2.6875rem] w-full text-center text-[var(--color-license)]">
                    Copyright © {dayjs().year()} {METADATA.AUTHOR.NAME}, All
                    rights reserved.
                  </p>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          </div>
        </header>
      </Accordion.Root>

      <div className="block tablet:hidden pt-[4.1875rem]">
        <Divider />
      </div>
    </>
  );
};
