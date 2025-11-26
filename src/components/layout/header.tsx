'use client';

import * as Accordion from '@radix-ui/react-accordion';
import dayjs from 'dayjs';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

import { SymbolIcon } from '@semantic/components/icons/Symbol';
import { Divider } from '@semantic/components/ui';
import { METADATA, ROUTES } from '@semantic/constants';

import { NavigateMenu } from './navigate-menu';
import { ThemeToggle } from './theme-toggle';

export const Header = () => {
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

  return (
    <>
      <Accordion.Root type="single" value={accordionOpen ? 'menu' : ''} collapsible>
        <AnimatePresence>
          {accordionOpen && (
            <motion.div
              className="fixed inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-[11px] z-[var(--z-overlay)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setAccordionOpen(false)}
            />
          )}
        </AnimatePresence>

        <header className="fixed flex top-0 left-0 w-full px-[var(--spacing-inline)] bg-[var(--color-background)] z-[var(--z-header)] tablet:hidden">
          <div className="row-between w-full max-w-[var(--app-width)] py-[0.8125rem] mx-auto">
            <Link
              href={ROUTES.HOME}
              className="text-[var(--color-gray-mid)] font-mono font-medium text-[0.9375rem] leading-[auto]"
            >
              <SymbolIcon />
            </Link>

            <Accordion.Item
              className="mt-[1px] overflow-hidden"
              id="menu-accordion-item"
              value="menu"
              aria-label="Menu Accordion"
            >
              <button
                className="center h-10 py-[0.6875rem] px-[0.9375rem] text-[var(--color-gray-mid)] font-mono font-medium text-[0.8125rem] leading-[1.125rem] border border-[var(--color-border)] rounded-[0.625rem] bg-[var(--color-toggle)] cursor-pointer"
                onClick={() => setAccordionOpen(!accordionOpen)}
                aria-controls="menu-accordion-content"
                aria-expanded={accordionOpen}
              >
                {accordionOpen ? '-' : 'menu'}
              </button>
              <Accordion.Content
                className="fixed top-[4.1875rem] left-0 w-full px-[var(--spacing-inline)] bg-[var(--color-background)] overflow-hidden data-[state=open]:animate-[var(--animate-accordion-slide-down)] data-[state=closed]:animate-[var(--animate-accordion-slide-up)]"
                id="menu-accordion-content"
                aria-labelledby="menu-accordion-item"
              >
                <div className="column w-full max-w-[var(--app-width)] pt-[1.5625rem] pb-[1.1875rem] mx-auto">
                  <div className="column w-full max-w-[122px] gap-[1.875rem]">
                    <NavigateMenu />
                    <ThemeToggle />
                  </div>
                  <p className="h7 w-full mt-[2.6875rem] text-[var(--color-license)] text-center">
                    Copyright © {dayjs().year()} {METADATA.AUTHOR.NAME}, All rights reserved.
                  </p>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          </div>
        </header>
      </Accordion.Root>

      <div className="block pt-[4.1875rem] tablet:hidden">
        <Divider />
      </div>
    </>
  );
};
