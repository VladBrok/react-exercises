import fs from "fs/promises";
import path from "path";

const fullPath = path.join(process.cwd(), "pages/exercises");

export async function getExercises() {
  const possible = await fs.readdir(fullPath, { withFileTypes: true });
  return possible
    .filter(entry => entry.isDirectory())
    .map(dir => ({ name: dir.name }));
}
