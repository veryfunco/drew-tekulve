import { promises as fs } from "fs";
import path from "path";

export async function allNarrativeProjectSubcategories() {
  const subcategoriesDir = path.join(
    process.cwd(),
    "content",
    "narrative_project_subcategories"
  );

  const subcategoriesFiles = await fs.readdir(subcategoriesDir);
  const subcategories = await Promise.all(
    subcategoriesFiles.map(async (filename) => {
      const file = await fs.readFile(
        path.join(subcategoriesDir, filename),
        "utf-8"
      );

      return JSON.parse(file);
    })
  );

  return subcategories;
}
