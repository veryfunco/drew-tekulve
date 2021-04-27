import { promises as fs } from "fs";
import path from "path";

export async function aboutPage() {
  const pagePath = path.join(process.cwd(), "content", "pages", "about.json");

  const file = await fs.readFile(pagePath, "utf-8");

  return JSON.parse(file);
}
