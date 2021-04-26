import { fetchFromContentful } from "../fetchFromContentful";
import { Project } from "../types";

export async function projectDetailData(slug: string) {
  return fetchFromContentful<{
    projectCollection: { items: Project[] };
  }>(
    `query {
      projectCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          title
          videoEmbedLink
          year
        }
      }
    }`
  );
}

export async function allProjectSlugs() {
  return fetchFromContentful<{
    projectCollection: { items: { slug: string }[] };
  }>(
    `query {
      projectCollection {
        items {
          slug
        }
      }
    }`
  );
}
