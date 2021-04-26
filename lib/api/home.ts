import { fetchFromContentful } from "./fetchFromContentful";
import { Category, Project } from "./types";

export async function homeData() {
  return fetchFromContentful<{
    projectCollection: {
      items: Pick<Project, "category" | "title" | "slug" | "year">[];
    };
    projectCategoryCollection: { items: Category[] };
  }>(
    `query {
      projectCollection(order: year_DESC) {
        items {
          category {
            title
          }
          slug
          title
          year
        }
      }

      projectCategoryCollection(order: title_ASC) {
        items {
          title
        }
      }
    }`
  );
}
