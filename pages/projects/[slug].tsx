import { GetStaticPropsContext } from "next";
import { promises as fs } from "fs";
import path from "path";

import { Navbar } from "../../components/Navbar";
import { Page } from "../../components/Page";
import { StaticProps } from "../../types";
import { projectBySlug } from "../../lib/data/projectBySlug";

import styles from "../../styles/projects/Detail.module.css";

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
  return (
    <Page>
      <Navbar backgroundColor="black" />

      <div className={styles.DetailsContainer}>
        <h2 className={styles.Title}>{project.title}</h2>
      </div>
    </Page>
  );
}
