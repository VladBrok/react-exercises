import fs from "fs/promises";
import path from "path";

const file = path.join(process.cwd(), "data/pokemon-app/pokemon-votes.json");

export default async function handler(_, res) {
  const buffer = await fs.readFile(file);
  const json = buffer.toString();
  return res.status(200).json(json);
}
