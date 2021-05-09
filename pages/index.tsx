import { useEffect, useState, useMemo } from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { animated, useTransition } from "@react-spring/web";

import { Button } from "components/Button";
import { Navbar } from "components/Navbar";
import { Container, Page } from "components/Page";
import { Stack } from "components/Stack";

import { allProjectCategories } from "lib/data/allProjectCategories";
import { globalProps } from "lib/data/globalProps";
import { homePage } from "lib/data/homePage";
import { getVideoEmbedLink } from "lib/getVideoEmbedLink";

import styles from "styles/Home.module.css";

export const getStaticProps = async () => {
  const global = await globalProps();
  const categories = await allProjectCategories();
  const { projects, hero_video_url, reel_button_text } = await homePage();

  return {
    props: {
      global,
      categories,
      projects,
      heroVideoUrl: hero_video_url,
      reelButtonText: reel_button_text,
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

  const filteredProjects = useMemo(() => {
    return props.projects.filter(
      (project) =>
        selectedCategory == null || selectedCategory === project.category
    );
  }, [props.projects, selectedCategory]);

  const transition = useTransition(filteredProjects, {
    keys: selectedCategory,
    enter: { opacity: 1, transform: "translate3d(0, 0px, 0)" },
    from: { opacity: 0, transform: "translate3d(0, 20px, 0)" },
    trail: 100,
  });

  return (
    <Page title="Work" padding={false}>
      <Navbar logoType="scrolly" />

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

        <div className={styles.ReelButton}>
          <Link href="/reel" passHref>
            <Button as="link">{props.reelButtonText}</Button>
          </Link>
        </div>
      </div>

      <Container>
        <div className={styles.ProjectsContainer}>
          <p className={styles.FilterTitle}>Filter work by category</p>

          <div className={styles.FilterButtonContainer}>
            <Stack align="center" wrap={false}>
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

          <div className={styles.ProjectsGrid}>
            {transition((animatedStyles, project) => {
              return (
                <animated.div style={animatedStyles}>
                  <Link href={`/projects/${project.slug}`}>
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
                        {project.subtitle == null ||
                        project.subtitle === "" ? null : (
                          <p>{project.subtitle}</p>
                        )}
                        <p>{project.year}</p>
                      </div>
                    </a>
                  </Link>
                </animated.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Page>
  );
}
