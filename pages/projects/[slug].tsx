import { useState } from "react";
import { GetStaticPropsContext } from "next";
import Image from "next/image";
import { animated, useTransition } from "@react-spring/web";

import { Button } from "components/Button";
import { Navbar } from "components/Navbar";
import { Page } from "components/Page";
import { Stack } from "components/Stack";
import { StaticProps } from "types";
import { allProjects } from "lib/data/allProjects";
import { projectBySlug } from "lib/data/projectBySlug";
import { getVideoEmbedLink } from "lib/getVideoEmbedLink";

import styles from "styles/projects/Detail.module.css";
import { globalProps } from "lib/data/globalProps";

export const getStaticProps = async (
  context: GetStaticPropsContext<{ slug: string }>
) => {
  const global = await globalProps();

  const { slug } = context.params;

  const project = await projectBySlug(slug);

  return project == null ? { notFound: true } : { props: { global, project } };
};

export const getStaticPaths = async () => {
  const slugs = await allProjects({ slugsOnly: true });

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export default function ProjectDetail({
  project,
}: StaticProps<typeof getStaticProps>) {
  const [videoActive, setVideoActive] = useState(false);
  const transitions = useTransition(videoActive, {
    from: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.99)" },
  });

  return (
    <Page>
      <Navbar backgroundColor="black" />

      <div className={styles.HeroContainer}>
        {transitions((animatedStyles, item) =>
          item ? (
            <iframe
              src={`${getVideoEmbedLink(project.video_url)}`}
              frameBorder="0"
              allowFullScreen
              style={{ height: "100%", width: "100%" }}
            ></iframe>
          ) : (
            <animated.div
              className={styles.HeroImageContainer}
              style={animatedStyles}
            >
              <Image
                src={project.thumbnail}
                layout="fill"
                className={styles.PreviewImage}
                alt=""
              />

              <div className={styles.PlayButtonContainer}>
                {project.video_url == null ? null : (
                  <Button wide onClick={() => setVideoActive(true)}>
                    Play
                  </Button>
                )}
              </div>
            </animated.div>
          )
        )}
      </div>

      <div className={styles.DetailsContainer}>
        <Stack spacing="loose" direction="column" align="center">
          <Stack spacing="extraTight" direction="column">
            <h2 className={styles.Title}>{project.title}</h2>
            {project.subtitle == null || project.subtitle === "" ? null : (
              <p className={styles.Subtitle}>{project.subtitle}</p>
            )}
          </Stack>

          <Stack direction="column" spacing="tight">
            <p>
              {project.year} – {project.category}
            </p>
            {project.description == null ||
            project.description === "" ? null : (
              <p className={styles.Description}>{project.description}</p>
            )}
          </Stack>

          <Stack direction="column" spacing="tight">
            {project.contributors == null
              ? null
              : project.contributors.map(({ name, role }) => (
                  <div key={`${name}-${role}`} className={styles.Contributor}>
                    <p>{role}</p>
                    <p style={{ textTransform: "uppercase" }}>{name}</p>
                  </div>
                ))}
          </Stack>
        </Stack>
      </div>
    </Page>
  );
}
