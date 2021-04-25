import { Navbar } from "../components/Navbar";
import { Page } from "../components/Page";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Page title="Work">
      <Navbar />

      <div className={styles.Container}>
        <p>Home</p>
      </div>
    </Page>
  );
}
