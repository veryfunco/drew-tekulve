import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Stack } from "../Stack";
import styles from "./Navbar.module.css";

interface Props {
  backgroundColor?: "black" | "blue";
  logoVariant?: "hidden" | "scrolly" | "static";
}

export function Navbar({ logoVariant = "static", backgroundColor }: Props) {
  const router = useRouter();

  // Number between 0 and 1 showing how much of the viewport height
  // has been scrolled through
  const [scrollAmount, setScrollAmount] = useState(0);

  useEffect(() => {
    function handleScroll(event) {
      setScrollAmount(
        Math.max(0, Math.min(1, window.scrollY / (window.innerHeight * 0.5)))
      );
    }

    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={styles.Container}>
      <div
        className={styles.Content}
        style={{
          background:
            backgroundColor === "black"
              ? "var(--color-black)"
              : backgroundColor === "blue"
              ? "var(--color-blue)"
              : "transparent",
        }}
      >
        <div>
          <h2 className={styles.Title}>Freelance Colorist</h2>
        </div>

        <div>
          {logoVariant === "static" ? (
            <Link href="/">
              <a>
                <img src="/images/logo.svg" className={styles.Logo} />
              </a>
            </Link>
          ) : null}

          {logoVariant === "scrolly" ? (
            <Link href="/">
              <a>
                <img
                  src="/images/logo.svg"
                  style={{
                    position: "absolute",
                    top: `calc(${30 * (1 - scrollAmount)}vh + 1rem)`,
                    width: `${450 * (1 - scrollAmount) + 150}px`,
                    left: `calc(50% - ${
                      (450 * (1 - scrollAmount) + 150) / 2
                    }px)`,
                  }}
                />
              </a>
            </Link>
          ) : null}
        </div>

        <Stack justify="end">
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
