import { ReactNode } from "react";
import Head from "next/head";

import styles from "./Page.module.css";

interface Props {
  children: ReactNode;
  title?: string;
}

export function Page({ children, title }: Props) {
  const fullTitle = title == null ? "Drew Tekulve" : `Drew Tekulve | ${title}`;

  return (
    <div className={styles.Page}>
      <Head>
        <title>{fullTitle}</title>
        <link rel="icon" href="/favicon.ico" />

        <link
          rel="preload"
          href="/fonts/SuisseIntlMono/SuisseIntlMono-Regular.otf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/MaxFett/MaxFett-Black.otf"
          as="font"
          crossOrigin=""
        />
      </Head>

      <div className={styles.Container}>{children}</div>
    </div>
  );
}
