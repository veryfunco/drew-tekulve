import { Navbar } from "../components/Navbar";
import { Page } from "../components/Page";
import styles from "../styles/About.module.css";

export default function About() {
  return (
    <Page title="About" background="blue">
      <Navbar />

      <div className={styles.HeroContainer}>
        <img className={styles.Logo} src="/images/logo.svg" />
      </div>

      <div className={styles.ContentContainer}>
        <p className={styles.Description}>
          Everything from TV shows and commercials to feature films that have
          screened at Sundance Film Festival. Working primarily in DaVinci
          Resolve, with experience in HDR and ACES workflows.
        </p>
      </div>
    </Page>
  );
}
