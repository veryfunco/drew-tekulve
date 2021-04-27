import { promises as fs } from "fs";
import path from "path";

import { slugFromFilename } from "./utils/slugFromFilename";

export async function allProjects() {
  const projectsDir = path.join(process.cwd(), "content", "projects");

  const projectFiles = await fs.readdir(projectsDir);
  const projects = await Promise.all(
    projectFiles.map(async (filename) => {
      const file = await fs.readFile(path.join(projectsDir, filename), "utf-8");

      const project = JSON.parse(file);

      return {
        ...project,
        slug: slugFromFilename(filename),
      };
    })
  );

  return projects;
}
