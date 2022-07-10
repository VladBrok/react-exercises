import fs from "fs/promises";
import path from "path";

const root = path.join(process.cwd(), "data/");

const RESOURCES = {
  POKEMON_VOTES: path.jon(root, "pokemon-app/pokemon-votes.json"),
  USERS: path.join(root, "telekilogram/users.json"),
};
export { RESOURCES };

export async function load(resource) {
  const json = await fs.readFile(resource);
  return JSON.parse(json);
}

export function save(data, resource) {
  return fs.writeFile(resource, JSON.stringify(data));
}
