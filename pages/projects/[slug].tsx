import { useState } from "react";
import { GetStaticPropsContext } from "next";
import { promises as fs } from "fs";
import path from "path";

import { Navbar } from "../../components/Navbar";
import { Page } from "../../components/Page";
import { StaticProps } from "../../types";
import { projectBySlug } from "../../lib/data/projectBySlug";
import { getVideoEmbedLink } from "../../lib/getVideoEmbedLink";

import styles from "../../styles/projects/Detail.module.css";
import { Stack } from "../../components/Stack";
import { Button } from "../../components/Button";

export const getStaticProps = async (
  context: GetStaticPropsContext<{ slug: string }>
) => {
  const { slug } = context.params;

  const project = await projectBySlug(slug);

  return project == null ? { notFound: true } : { props: { project } };
};

export const getStaticPaths = async () => {
  const filenames = await fs.readdir(
    path.join(process.cwd(), "content", "projects")
  );

  const slugs = filenames.map((filename) => {
    const extension = path.extname(filename);

    return path.basename(filename, extension);
  });

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export default function ProjectDetail({
  project,
}: StaticProps<typeof getStaticProps>) {
  const [videoActive, setVideoActive] = useState(false);

  return (
    <Page>
      <Navbar backgroundColor="black" />

      <div className={styles.HeroContainer}>
        {videoActive ? (
          <iframe
            src={`${getVideoEmbedLink(project.video_url)}`}
            frameBorder="0"
            allowFullScreen
            style={{ height: "100%", width: "100%" }}
          ></iframe>
        ) : (
          <div
            className={styles.Thumbnail}
            style={{
              backgroundImage: `url("${project.thumbnail}")`,
            }}
          >
            {project.video_url == null ? null : (
              <Button wide onClick={() => setVideoActive(true)}>
                Play
              </Button>
            )}
          </div>
        )}
      </div>

      <div className={styles.DetailsContainer}>
        <h2 className={styles.Title}>{project.title}</h2>

        <Stack direction="column" spacing="tight">
          <p>
            {project.year} – {project.category}
          </p>

          {project.contributors == null
            ? null
            : project.contributors.map(({ name, role }) => (
                <div key={`${name}-${role}`} className={styles.Contributor}>
                  <p>{role}</p>
                  <p style={{ textTransform: "uppercase" }}>{name}</p>
                </div>
              ))}
        </Stack>
      </div>
    </Page>
  );
}
