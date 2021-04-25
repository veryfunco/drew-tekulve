import Link from "next/link";
import styles from "./Navbar.module.css";

export function Navbar() {
  return (
    <nav className={styles.Container}>
      <div>
        <h2 className={styles.Title}>Freelance Colorist</h2>
      </div>

      <div>
        <Link href="/">
          <a className={styles.Link}>Work</a>
        </Link>

        <Link href="/about">
          <a className={styles.Link}>About</a>
        </Link>
      </div>
    </nav>
  );
}
