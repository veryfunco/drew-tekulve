import { useState } from "react";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";

import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { Page } from "../components/Page";
import { Stack } from "../components/Stack";
import { homeData } from "../lib/api";

import styles from "../styles/Home.module.css";
import classNames from "classnames";

export const getStaticProps = async () => {
  const { projectCategoryCollection, projectCollection } = await homeData();

  return {
    props: {
      categories: projectCategoryCollection.items,
      projects: projectCollection.items,
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
      <Navbar hideLogo />

      <div className={styles.HeroContainer}>
        <iframe
          title="vimeo-player"
          src="https://player.vimeo.com/video/527679440?title=0&byline=0&portrait=0&background=1"
          className={styles["HeroContainer-cover"]}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className={styles.ProjectsContainer}>
        <p className={styles.FilterTitle}>Filter work by category</p>

        <Stack spacing="extraTight" align="center">
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

        <div className={styles.ProjectsGrid}>
          {props.projects.map((project) => {
            if (
              selectedCategory != null &&
              project.category.title !== selectedCategory
            ) {
              return null;
            }

            return (
              <Link key={project.slug} href={`/projects/${project.slug}`}>
                <a>
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.year}</p>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </Page>
  );
}
