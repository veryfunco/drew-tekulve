import { GetStaticPropsContext } from "next";
import Head from "next/head";
import Link from "next/link";

import { Button } from "components/Button";
import { Page } from "components/Page";
import { Stack } from "components/Stack";
import { StillsViewer } from "components/StillsViewer";
import { VideoEmbed } from "components/VideoEmbed";
import { StaticProps } from "types";
import { allProjects } from "lib/data/allProjects";
import { projectBySlug } from "lib/data/projectBySlug";

import styles from "styles/projects/Detail.module.css";
import { globalProps } from "lib/data/globalProps";
import { adjacentProjects } from "lib/data/adjacentProjects";
import { SEOImage } from "components/SEOImage";

export const getStaticProps = async (
  context: GetStaticPropsContext<{ slug: string }>
) => {
  const global = await globalProps();

  const { slug } = context.params;
  const project = await projectBySlug(slug);

  if (project == null) {
    return { notFound: true };
  }

  const {
    previous: previousProject,
    next: nextProject,
  } = await adjacentProjects(project.id);

  return {
    props: {
      key: project.id, // Required to ensure state resets on navigation
      global,
      project,
      previousProject,
      nextProject,
    },
  };
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
  previousProject,
  nextProject,
}: StaticProps<typeof getStaticProps>) {
  let heroContent = null;
  if (project.video_url != null) {
    heroContent = (
      <div className={styles.VideoHeroContainer}>
        <VideoEmbed
          videoUrl={project.video_url}
          coverImageUrl={project.thumbnail}
        />
      </div>
    );
  } else if (project.stills.length > 0) {
    heroContent = (
      <div className={styles.StillsHeroContainer}>
        <StillsViewer stills={project.stills} projectName={project.title} />
      </div>
    );
  }

  return (
    <Page>
      <Head>
        <meta
          property="og:description"
          content={project.description}
          key="og:description"
        />
        <meta
          property="twitter:description"
          content={project.description}
          key="twitter:description"
        />
      </Head>
      <SEOImage src={project.thumbnail} />

      {heroContent}

      <div className={styles.DetailsContainer}>
        <Stack spacing="extraLoose" direction="column" align="center">
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

          <Stack direction="column">
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

      {nextProject == null && previousProject == null ? (
        <div className={styles.NavButtonsContainer}>
          <div />
          <div className={styles.NavText}>
            <Link href="/">See more projects &rarr;</Link>
          </div>
          <div />
        </div>
      ) : (
        <div className={styles.NavButtonsContainer}>
          <div className={styles.ButtonPrevious}>
            {previousProject == null ? (
              <Button disabled aria-hidden="true">
                &larr;
              </Button>
            ) : (
              <Link href={`/projects/${previousProject}`} passHref legacyBehavior>
                <Button as="link" aria-label="View previous project">
                  &larr;
                </Button>
              </Link>
            )}
          </div>

          <div className={styles.NavText}>
            <p>See more projects</p>
          </div>

          <div className={styles.ButtonNext}>
            {nextProject == null ? (
              <Button disabled aria-hidden="true">
                &rarr;
              </Button>
            ) : (
              <Link href={`/projects/${nextProject}`} passHref legacyBehavior>
                <Button as="link" aria-label="View next project">
                  &rarr;
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </Page>
  );
}
