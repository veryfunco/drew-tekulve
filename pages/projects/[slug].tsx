import { GetStaticPropsContext } from "next";

import { Navbar } from "../../components/Navbar";
import { Page } from "../../components/Page";
import {
  allProjectSlugs,
  projectDetailData,
} from "../../lib/api/projects/detail";
import { StaticProps } from "../../types";

import styles from "../../styles/projects/Detail.module.css";

export const getStaticProps = async (
  context: GetStaticPropsContext<{ slug: string }>
) => {
  const { slug } = context.params;

  const { projectCollection } = await projectDetailData(slug);

  if (projectCollection.items.length < 1) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project: projectCollection.items[0],
    },
  };
};

export const getStaticPaths = async () => {
  const slugs = await allProjectSlugs();

  return {
    paths: slugs.projectCollection.items.map(({ slug }) => ({
      params: { slug },
    })),
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
