import { GetStaticPropsContext } from "next";
import { promises as fs } from "fs";
import path from "path";

import { Navbar } from "../../components/Navbar";
import { Page } from "../../components/Page";
import { StaticProps } from "../../types";

import styles from "../../styles/projects/Detail.module.css";

export const getStaticProps = async (
  context: GetStaticPropsContext<{ slug: string }>
) => {
  const { slug } = context.params;

  const projectContentPath = path.join(
    process.cwd(),
    "content",
    "projects",
    `${slug}.json`
  );

  try {
    const projectFile = await fs.readFile(projectContentPath, "utf-8");

    const project = JSON.parse(projectFile);

    return {
      props: {
        project,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
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
      <Navbar />

      <div className={styles.DetailsContainer}>
        <h2 className={styles.Title}>{project.title}</h2>
      </div>
    </Page>
  );
}
