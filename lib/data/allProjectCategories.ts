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

  // Sort categories by order
  return categories.sort((a, b) => a.order - b.order);
}

export async function getSubcategoriesForCategory(
  categoryTitle: string
): Promise<Subcategory[]> {
  const categories = await allProjectCategories();
  const category = categories.find((cat) => cat.title === categoryTitle);
  return category?.subcategories || [];
}

export async function getAllSubcategories(): Promise<Subcategory[]> {
  const categories = await allProjectCategories();
  const allSubcategories: Subcategory[] = [];

  categories.forEach((category) => {
    allSubcategories.push(...category.subcategories);
  });

  return allSubcategories;
}
