import { PropsWithChildren, ViewTransition } from 'react';

import { Header } from './header';
import { Sidebar } from './sidebar';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full h-full max-w-[var(--spacing-app)] mx-auto pl-0 tablet:max-w-[calc(var(--spacing-app)+var(--spacing-sidebar))] tablet:pl-[var(--spacing-sidebar)] desktop:max-w-[var(--spacing-app)] desktop:pl-0">
      <Sidebar />
      <Header />
      <ViewTransition name="cross">
        <main className="column pt-[2.65625rem] tablet:pt-[6.25rem]">{children}</main>
      </ViewTransition>
    </div>
  );
};
