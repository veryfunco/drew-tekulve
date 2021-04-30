import { homePage } from "./homePage";

export async function adjacentProjects(id: string) {
  const { projects } = await homePage();
  const currentProjectIndex = projects.findIndex(
    (project) => project.id === id
  );

  if (currentProjectIndex == null) {
    throw new Error(`Could not find project with id ${id}`);
  }

  const isFirst = currentProjectIndex === 0;
  const isLast = currentProjectIndex === projects.length - 1;

  return {
    previous: isFirst ? null : projects[currentProjectIndex - 1].slug,
    next: isLast ? null : projects[currentProjectIndex + 1].slug,
  };
}
