import { ReactNode } from "react";
import Head from "next/head";
import classnames from "classnames";

import styles from "./Page.module.css";

interface Props {
  children: ReactNode;
  background?: "black" | "blue";
  title?: string;
}

export function Page({ children, title, background = "black" }: Props) {
  const fullTitle = title == null ? "Drew Tekulve" : `Drew Tekulve – ${title}`;

  return (
    <>
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

      <div
        className={classnames(
          styles.Page,
          background === "blue" && styles["Page-blue"]
        )}
      >
        <div className={styles.Container}>
          {children}

          <footer className={styles.Footer}>
            <div>
              Drew Tekulve <br />
              Freelance Colorist
            </div>

            <div className={styles.SocialIconsContainer}>
              <a
                href="https://instagram.com/drewtekulve"
                className={styles.SocialIcon}
                target="_blank"
              >
                <img src="/icons/instagram.svg" alt="Instagram" />
              </a>
              <a
                href="https://www.linkedin.com/in/drewtekulve"
                className={styles.SocialIcon}
                target="_blank"
              >
                <img src="/icons/linkedin.svg" alt="LinkedIn" />
              </a>
              <a
                href="https://letterboxd.com/drewtekulve"
                className={styles.SocialIcon}
                target="_blank"
              >
                <img src="/icons/letterboxd.svg" alt="Letterboxd" />
              </a>
              <a
                href="mailto:drewtekulve@gmail.com"
                className={styles.SocialIcon}
                target="_blank"
              >
                <img src="/icons/email.svg" alt="Email" />
              </a>
            </div>

            <div className={styles.CopyrightContainer}>
              &copy;{new Date().getFullYear()} All Rights Reserved <br />
              Tekulve LLC
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
