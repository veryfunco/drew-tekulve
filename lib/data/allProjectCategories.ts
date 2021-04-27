import { promises as fs } from "fs";
import path from "path";

export async function allProjectCategories() {
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

      return JSON.parse(file);
    })
  );

  return categories;
}
