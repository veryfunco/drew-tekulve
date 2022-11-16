import { useEffect, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useAppContext } from "lib/AppContext";
import { useWindowSize } from "lib/useWindowSize";
import { Stack } from "../Stack";

import styles from "./Navbar.module.css";
import { useMediaQuery } from "lib/useMediaQuery";

const ScrollyLogo = dynamic(() => import("./components/ScrollyLogo"), {
  ssr: false,
});

const MOBILE_NAV_BREAKPOINT_WIDTH = 700;

interface Props {
  backgroundColor?: "black" | "blue";
  logoType?: "static" | "scrolly";
}

export function Navbar({
  logoType = "static",
  backgroundColor = "black",
}: Props) {
  const router = useRouter();
  const { jobTitle } = useAppContext();
  const [scrollEffectAmount, setScrollEffectAmount] = useState(null);
  const windowSize = useWindowSize();
  const isMobileNav = useMediaQuery(MOBILE_NAV_BREAKPOINT_WIDTH);

  useEffect(() => {
    function handleScroll() {
      if (windowSize == null) {
        return;
      }

      const { scrollY } = window;

      if (scrollY > windowSize.height) {
        setScrollEffectAmount(0);
        return;
      }

      const proportionScrolled = Math.max(0, scrollY) / windowSize.height;
      setScrollEffectAmount(1 - proportionScrolled);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [windowSize]);

  // Make the logo effect happen twice as fast as the background effect
  const logoScrollAmount =
    scrollEffectAmount == null
      ? null
      : Math.max(0, (scrollEffectAmount - 0.5) / 0.5);
  const backgroundScrollAmount = scrollEffectAmount;

  let background: string;
  if (backgroundColor === "black") {
    background = "var(--color-black)";
  } else if (backgroundColor === "blue") {
    background = "var(--color-blue)";
  } else {
    throw new Error(`Unrecognized color ${backgroundColor}`);
  }

  return (
    <nav className={styles.Container}>
      {logoType === "scrolly" && logoScrollAmount != null ? (
        <ScrollyLogo scrollAmount={logoScrollAmount} />
      ) : null}

      <div
        className={styles.Content}
        style={{
          background:
            backgroundScrollAmount < 0.01 ? background : "transparent",
        }}
      >
        <div className={styles.JobTitleContainer}>
          <h2 className={styles.Title}>{jobTitle}</h2>
        </div>

        {logoType === "static" ? (
          <div className={styles.StaticLogoContainer}>
            <Link href="/">
              <img
                src="/images/logo.svg"
                style={{ width: 150 }}
                alt="Drew Tekulve"
              />
            </Link>
          </div>
        ) : null}

        <div className={styles.LinksContainer}>
          <Stack justify={isMobileNav ? "spaceBetween" : "end"} spacing="loose">
            <Link
              href="/"
              className={classNames(
                styles.Link,
                (router.asPath === "/" ||
                  router.route === "/projects/[slug]") &&
                  styles["Link-active"]
              )}
            >
              Work
            </Link>
            <Link
              href="/about"
              className={classNames(
                styles.Link,
                router.asPath === "/about" && styles["Link-active"]
              )}
            >
              About
            </Link>
          </Stack>
        </div>
      </div>
    </nav>
  );
}
