import { promises as fs } from "fs";
import path from "path";

export interface ProjectCategory {
  title: string;
  order: number;
  subcategories: Array<{ title: string }>;
}

export interface Subcategory {
  title: string;
}

export async function allProjectCategories(): Promise<ProjectCategory[]> {
  const categoriesDir = path.join(
    process.cwd(),
    "content",
    "project_categories"
  );

  const categoriesFiles = await fs.readdir(categoriesDir);
  const categories = await Promise.all(
    categoriesFiles.map(async (filename) => {
      const file = await fs.readFile(
        path.join(categoriesDir, filename),
        "utf-8"
      );

      return JSON.parse(file) as ProjectCategory;
    })
  );

  return categories.sort((a, b) => a.order - b.order);
}
