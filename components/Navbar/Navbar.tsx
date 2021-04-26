import Link from "next/link";
import { Stack } from "../Stack";
import styles from "./Navbar.module.css";

interface Props {
  hideLogo?: boolean;
}

export function Navbar({ hideLogo }: Props) {
  return (
    <nav className={styles.Container}>
      <div className={styles.Content}>
        <div>
          <h2 className={styles.Title}>Freelance Colorist</h2>
        </div>

        <div>
          {hideLogo ? null : (
            <Link href="/">
              <a>
                <img src="/images/logo.svg" className={styles.Logo} />
              </a>
            </Link>
          )}
        </div>

        <Stack justify="end">
          <Link href="/">
            <a className={styles.Link}>Work</a>
          </Link>
          <Link href="/about">
            <a className={styles.Link}>About</a>
          </Link>
        </Stack>
      </div>
    </nav>
  );
}
