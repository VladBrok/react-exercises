import { load, RESOURCES } from "../../lib/storage";

export default async function handler(_, res) {
  const json = JSON.stringify(await load(RESOURCES.POKEMON_VOTES));
  return res.status(200).json(json);
}
