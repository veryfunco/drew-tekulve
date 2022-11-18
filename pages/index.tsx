import { useEffect, useState, useMemo } from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/legacy/image";
import Link from "next/link";
import { animated, useTransition } from "@react-spring/web";

import { Button } from "components/Button";
import { Container, Page } from "components/Page";
import { Stack } from "components/Stack";

import { allProjectCategories } from "lib/data/allProjectCategories";
import { allNarrativeProjectSubcategories } from "lib/data/allNarrativeProjectSubcategories";
import { globalProps } from "lib/data/globalProps";
import { homePage } from "lib/data/homePage";
import { getVideoEmbedLink } from "lib/getVideoEmbedLink";

import styles from "styles/Home.module.css";

export const getStaticProps = async () => {
  const global = await globalProps();
  const categories = await allProjectCategories();
  const narrativeProjectSubcategories = await allNarrativeProjectSubcategories();
  const { projects, hero_video_url, reel_button_text } = await homePage();

  return {
    props: {
      global,
      categories,
      narrativeProjectSubcategories,
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
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [lazyCanLoad, setLazyCanLoad] = useState(false);

  useEffect(() => {
    setLazyCanLoad(true);
  }, []);

  function handleCategoryButtonClick(category: string | null) {
    setSelectedCategory(category);
  }

  function handleSubcategoryButtonClick(subcategory: string | null) {
    setSelectedSubcategory(subcategory);
  }

  const filteredProjects = useMemo(() => {
    const filteredByCategory = props.projects.filter(
      (project) =>
        selectedCategory == null || selectedCategory === project.category
    );

    if (selectedCategory === "Narrative") {
      const filteredBySubcategory = filteredByCategory.filter(
        (project) =>
          selectedSubcategory == null ||
          project.subcategory === selectedSubcategory
      );

      return filteredBySubcategory;
    } else {
      return filteredByCategory;
    }
  }, [props.projects, selectedCategory, selectedSubcategory]);

  const transition = useTransition(filteredProjects, {
    // keys: (item) => item.title,
    keys: `${selectedCategory}-${selectedSubcategory}`,
    enter: { opacity: 1, transform: "translate3d(0, 0px, 0)" },
    from: { opacity: 0, transform: "translate3d(0, 20px, 0)" },
    trail: 100,
  });

  return (
    <Page title="Work" padding={false} navbarLogoType="scrolly">
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
          <Link href="/reel" passHref legacyBehavior>
            <Button as="link">{props.reelButtonText}</Button>
          </Link>
        </div>
      </div>

      <Container>
        <div className={styles.ProjectsContainer}>
          <p className={styles.FilterTitle}>Filter work by category</p>

          <div className={styles.FilterButtonContainer}>
            <Stack direction="column">
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
              {selectedCategory === "Narrative" ? (
                <Stack align="center">
                  <p>&rarr;</p>
                  <Button
                    onClick={() => handleSubcategoryButtonClick(null)}
                    wide
                    transparent={selectedSubcategory != null}
                  >
                    All
                  </Button>
                  {props.narrativeProjectSubcategories.map((subcategory) => {
                    return (
                      <Button
                        key={subcategory.title}
                        onClick={() =>
                          handleSubcategoryButtonClick(subcategory.title)
                        }
                        transparent={selectedSubcategory !== subcategory.title}
                      >
                        {subcategory.title}
                      </Button>
                    );
                  })}
                </Stack>
              ) : null}
            </Stack>
          </div>

          <div className={styles.ProjectsGrid}>
            {transition((animatedStyles, project) => {
              return (
                <animated.div style={animatedStyles}>
                  <Link href={`/projects/${project.slug}`} legacyBehavior>
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
