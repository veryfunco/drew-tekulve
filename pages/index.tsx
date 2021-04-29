import { useEffect, useState } from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { Container, Page } from "../components/Page";
import { Stack } from "../components/Stack";

import { allProjects } from "../lib/data/allProjects";
import { allProjectCategories } from "../lib/data/allProjectCategories";
import { homePage } from "../lib/data/homePage";
import { getVideoEmbedLink } from "../lib/getVideoEmbedLink";

import styles from "../styles/Home.module.css";

export const getStaticProps = async () => {
  const categories = await allProjectCategories();
  const projects = await allProjects();
  const { projects: projectRelations, hero_video_url } = await homePage();

  const mappedProjects = projectRelations.map((title) => {
    return projects.find((project) => project.title === title);
  });

  return {
    props: {
      categories,
      projects: mappedProjects,
      heroVideoUrl: hero_video_url,
    },
  };
};

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lazyCanLoad, setLazyCanLoad] = useState(false);

  useEffect(() => {
    setLazyCanLoad(true);
  }, []);

  function handleCategoryButtonClick(category: string) {
    setSelectedCategory(category);
  }

  return (
    <Page title="Work" padding={false}>
      <Navbar />

      <div className={styles.VideoBackground}>
        {lazyCanLoad ? (
          <iframe
            title="vimeo-player"
            src={getVideoEmbedLink(props.heroVideoUrl, {
              title: "0",
              byline: "0",
              portrait: "0",
              background: "1",
            })}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : null}
      </div>

      <Container>
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
            {props.projects
              .filter(
                (project) =>
                  selectedCategory == null ||
                  project.category === selectedCategory
              )
              .map((project) => {
                return (
                  <Link key={project.slug} href={`/projects/${project.slug}`}>
                    <a>
                      <div className={styles.Project}>
                        <Image
                          height={250}
                          width={500}
                          src={project.thumbnail}
                          className={styles.Thumbnail}
                          layout="responsive"
                          alt=""
                        />
                        <h3>{project.title}</h3>
                        <p>{project.year}</p>
                      </div>
                    </a>
                  </Link>
                );
              })}
          </div>
        </div>
      </Container>
    </Page>
  );
}
