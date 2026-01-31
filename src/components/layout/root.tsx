import { type PropsWithChildren, ViewTransition } from "react";

import { Header } from "./header";
import { Sidebar } from "./sidebar";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="mx-auto h-full w-full desktop:max-w-[var(--spacing-app)] max-w-[var(--spacing-app)] tablet:max-w-[calc(var(--spacing-app)+var(--spacing-sidebar))] desktop:pl-0 pl-0 tablet:pl-[var(--spacing-sidebar)]">
      <Sidebar />
      <Header />
      <ViewTransition name="cross">
        <main className="column pt-[2.65625rem] tablet:pt-[6.25rem]">
          {children}
        </main>
      </ViewTransition>
    </div>
  );
};
