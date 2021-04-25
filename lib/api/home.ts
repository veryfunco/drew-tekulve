import { fetchFromContentful } from "./fetchFromContentful";
import { Category } from "./types";

export async function homeData() {
  return fetchFromContentful<{
    projectCategoryCollection: { items: Category[] };
  }>(
    `query {
      projectCategoryCollection(order: title_ASC) {
        items {
          title
        }
      }
    }`
  );
}
