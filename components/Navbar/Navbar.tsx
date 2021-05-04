import { useEffect, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppContext } from "lib/AppContext";
import { Stack } from "../Stack";
import styles from "./Navbar.module.css";

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
  const [scrollEffectAmount, setScrollEffectAmount] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const { scrollY, innerHeight } = window;

      if (scrollY > innerHeight) {
        setScrollEffectAmount(0);
        return;
      }

      const proportionScrolled = Math.max(0, scrollY) / innerHeight;
      setScrollEffectAmount(1 - proportionScrolled);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Make the logo effect happen twice as fast as the background effect
  const logoScrollAmount = Math.max(0, (scrollEffectAmount - 0.5) / 0.5);
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
      {logoType === "scrolly" ? (
        <div
          style={{
            top: `max(${50 * logoScrollAmount}%, var(--spacing-base))`,
            transform: `translate3d(-50%, -${60 * logoScrollAmount}%, 0)`,
          }}
          className={styles.ScrollyLogoContainer}
        >
          <Link href="/">
            <a>
              <img
                src="/images/logo.svg"
                style={{ width: 150 + 400 * logoScrollAmount }}
              />
            </a>
          </Link>
        </div>
      ) : null}

      <div
        className={styles.Content}
        style={{
          background:
            backgroundScrollAmount < 0.01 ? background : "transparent",
        }}
      >
        <div>
          <h2 className={styles.Title}>{jobTitle}</h2>
        </div>

        {logoType === "static" ? (
          <div className={styles.StaticLogoContainer}>
            <Link href="/">
              <a>
                <img src="/images/logo.svg" style={{ width: 150 }} />
              </a>
            </Link>
          </div>
        ) : null}

        <Stack justify="end" spacing="loose">
          <Link href="/">
            <a
              className={classNames(
                styles.Link,
                (router.asPath === "/" ||
                  router.route === "/projects/[slug]") &&
                  styles["Link-active"]
              )}
            >
              Work
            </a>
          </Link>
          <Link href="/about">
            <a
              className={classNames(
                styles.Link,
                router.asPath === "/about" && styles["Link-active"]
              )}
            >
              About
            </a>
          </Link>
        </Stack>
      </div>
    </nav>
  );
}
