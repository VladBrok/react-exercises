import { getNumPokemons, getPokemon } from "./utils";

export async function getRandomPokemon(...disallowedIds) {
  const numPokemons = await getNumPokemons();
  const id = takeRandom(getAllowedIds(numPokemons, ...disallowedIds));
  const pokemon = await getPokemon(id);

  if (!pokemon.imageUrl) {
    return await getRandomPokemon(...disallowedIds, pokemon.id);
  }

  return pokemon;
}

function takeRandom(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

function getAllowedIds(numPokemons, ...disallowedIds) {
  const disallowedIdsSet = new Set(disallowedIds);
  return Array(numPokemons)
    .fill(0)
    .map((_, i) => i + 1)
    .filter(id => !disallowedIdsSet.has(id));
}
