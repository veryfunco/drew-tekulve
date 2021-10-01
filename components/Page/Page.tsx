import { ReactNode } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import classnames from "classnames";

import { Navbar } from "components/Navbar";
import { SEOImage } from "components/SEOImage";
import { Stack } from "components/Stack";
import { useAppContext } from "lib/AppContext";
import { makeAbsoluteURL } from "lib/makeAbsoluteURL";

import styles from "./Page.module.css";

interface Props {
  children: ReactNode;
  background?: "black" | "blue";
  title?: string;
  padding?: boolean;
  navbarLogoType?: Parameters<typeof Navbar>[0]["logoType"];
  navbarBackgroundColor?: Parameters<typeof Navbar>[0]["backgroundColor"];
}

// For use on pages that define padding = false,
// but need the default padding in some areas
export function Container({ children }: { children: ReactNode }) {
  return <div className={styles.Container}>{children}</div>;
}

export function Page({
  children,
  title,
  background = "black",
  padding = true,
  navbarLogoType,
  navbarBackgroundColor,
}: Props) {
  const router = useRouter();
  const { jobTitle, email, metaDescription, metaImage } = useAppContext();
  const fullTitle = title == null ? "Drew Tekulve" : `Drew Tekulve – ${title}`;
  const url = makeAbsoluteURL(router.asPath);

  return (
    <>
      <Head>
        <title>{fullTitle}</title>

        <meta property="og:title" content={fullTitle} key="og:title" />
        <meta property="og:url" content={url} key="og:url" />
        <meta property="og:type" content="website" key="og:type" />
        <meta
          property="og:description"
          content={metaDescription}
          key="og:description"
        />
        <meta
          name="twitter:card"
          content="summary_large_image"
          key="twitter:card"
        />
        <meta name="twitter:url" content={url} key="twitter:url" />
        <meta name="twitter:title" content={fullTitle} key="twitter:title" />
        <meta
          property="twitter:description"
          content={metaDescription}
          key="twitter:description"
        />

        <link rel="icon" href="/favicon.ico" />

        <meta
          name="theme-color"
          content={background === "blue" ? "#1c19c7" : "#000000"}
        />

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
      <SEOImage src={metaImage} />

      <div
        className={classnames(
          styles.Page,
          background === "blue" && styles["Page-blue"]
        )}
      >
        <div
          className={classnames(
            styles.Container,
            padding === false && styles["Container-noPadding"]
          )}
        >
          <Navbar
            backgroundColor={navbarBackgroundColor}
            logoType={navbarLogoType}
          />

          {children}
        </div>

        <footer className={styles.Footer}>
          <div>
            Drew Tekulve <br />
            {jobTitle}
          </div>

          <Stack align="center" justify="center">
            <a
              href="https://instagram.com/drewtekulve"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/icons/instagram.svg"
                alt="Instagram"
                width="22px"
                height="22px"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/drewtekulve"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/icons/linkedin.svg"
                alt="LinkedIn"
                width="22px"
                height="22px"
              />
            </a>
            <a
              href="https://letterboxd.com/drewtekulve"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/icons/letterboxd.svg"
                alt="Letterboxd"
                width="33px"
                height="14px"
              />
            </a>
            <a
              href="https://www.imdb.com/name/nm6235937/?ref_=fn_al_nm_1"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/icons/imdb.svg"
                width="36px"
                height="18px"
                alt="IMDb"
              />
            </a>
            <a href={`mailto:${email}`} target="_blank" rel="noreferrer">
              <img
                src="/icons/email.svg"
                alt="Email"
                width="24px"
                height="17px"
              />
            </a>
          </Stack>

          <div className={styles.CopyrightContainer}>
            &copy;{new Date().getFullYear()} All Rights Reserved <br />
            Tekulve LLC
          </div>
        </footer>
      </div>
    </>
  );
}
