import { InferGetStaticPropsType } from "next";

import { Navbar } from "../components/Navbar";
import { Page } from "../components/Page";
import { homeData } from "../lib/api";

import styles from "../styles/Home.module.css";

export const getStaticProps = async () => {
  const { projectCategoryCollection } = await homeData();

  return {
    props: {
      categories: projectCategoryCollection.items,
    },
  };
};

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Page title="Work">
      <Navbar />

      <div className={styles.Container}>
        <p>Home</p>
      </div>

      <div>
        {props.categories.map((category) => (
          <p key={category.title}>{category.title}</p>
        ))}
      </div>
    </Page>
  );
}
