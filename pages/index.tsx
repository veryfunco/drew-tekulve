import Head from "next/head";
import { Navbar } from "../components/Navbar";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.Page}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <div className={styles.Container}>
        <p>Home</p>
      </div>
    </div>
  );
}
