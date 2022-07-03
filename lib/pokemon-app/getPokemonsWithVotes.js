import { getAllPokemons } from "./utils";
import path from "path";
import fs from "fs/promises";

const file = path.join(process.cwd(), "data/pokemon-app/pokemon-votes.json");

export async function getPokemonsWithVotes() {
  // FIXME: dup with /api/votefor
  const buffer = await fs.readFile(file);
  const json = buffer.toString();
  const votes = JSON.parse(json);
  const voteMap = new Map(votes.map(v => [+v.id, v.voteCount]));

  const totalVotes = votes.reduce((sum, cur) => sum + cur.voteCount, 0);
  const pokemons = await getAllPokemons();
  return pokemons
    .map(p => ({
      ...p,
      percentage: getPercentage(totalVotes, voteMap.get(p.id) ?? 0),
    }))
    .sort((a, b) => b.percentage - a.percentage);
}

function getPercentage(total, part) {
  if (!total) {
    return 0;
  }
  return ((part * 100) / total).toFixed(2);
}
