import path from "path";

export function slugFromFilename(filename: string) {
  return path.basename(filename, path.extname(filename));
}
