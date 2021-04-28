import path from "path";
import { promises as fs } from "fs";

export async function projectBySlug(slug: string) {
  const projectContentPath = path.join(
    process.cwd(),
    "content",
    "projects",
    `${slug}.json`
  );

  try {
    const projectFile = await fs.readFile(projectContentPath, "utf-8");

    return JSON.parse(projectFile);
  } catch (error) {
    return null;
  }
}
