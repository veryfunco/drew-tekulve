import { promises as fs } from "fs";
import path from "path";

export async function globalProps() {
  const infoFile = await fs.readFile(
    path.join(process.cwd(), "content/general/info.json"),
    "utf-8"
  );

  const seoFile = await fs.readFile(
    path.join(process.cwd(), "content/general/seo.json"),
    "utf-8"
  );

  const { job_title, email } = JSON.parse(infoFile);
  const { description } = JSON.parse(seoFile);

  return { email, jobTitle: job_title, metaDescription: description };
}
