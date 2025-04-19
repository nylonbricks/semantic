import { PropsWithChildren } from 'react';

import { Header } from './header';
import { Sidebar } from './sidebar';
import * as styles from './styles.css';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.root}>
      <Sidebar />
      <Header />
      <main className={styles.main} data-animate={true} data-animate-speed="slow">
        {children}
      </main>
    </div>
  );
};
