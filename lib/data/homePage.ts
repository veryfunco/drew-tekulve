import { promises as fs } from "fs";
import path from "path";

import { allProjects } from "./allProjects";

export async function homePage() {
  const projects = await allProjects();

  const pagePath = path.join(process.cwd(), "content", "pages", "home.json");
  const file = await fs.readFile(pagePath, "utf-8");
  const { projects: projectIds, ...homeData } = JSON.parse(file);

  const joinedProjects = projectIds.map(({ project_id }) => {
    return projects.find(({ id }) => id === project_id);
  });

  return { ...homeData, projects: joinedProjects };
}
