import { useState } from "react";
import { InferGetStaticPropsType } from "next";

import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { Page } from "../components/Page";
import { Stack } from "../components/Stack";
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  function handleCategoryButtonClick(category: string) {
    setSelectedCategory(category);
  }

  return (
    <Page title="Work">
      <Navbar />

      <div className={styles.HeroContainer}>
        <p>Home</p>
      </div>

      <div className={styles.ProjectsContainer}>
        <Stack>
          <Button
            onClick={() => handleCategoryButtonClick(null)}
            wide
            transparent={selectedCategory != null}
          >
            All
          </Button>

          {props.categories.map((category) => (
            <Button
              transparent={selectedCategory !== category.title}
              onClick={() => handleCategoryButtonClick(category.title)}
              key={category.title}
            >
              {category.title}
            </Button>
          ))}
        </Stack>
      </div>
    </Page>
  );
}
