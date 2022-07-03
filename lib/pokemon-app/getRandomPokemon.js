const BASE_URL = `https://pokeapi.co/api/v2/`;

export async function getRandomPokemon(...disallowedIds) {
  const numPokemons = (await fetchJson(`pokemon-species/?limit=0`)).count;
  const id = takeRandom(getAllowedIds(numPokemons, ...disallowedIds));
  const pokemon = await fetchJson(`pokemon/${id}`);
  const sprite = pokemon.sprites.front_default;

  if (!sprite) {
    return await getRandomPokemon(...disallowedIds, pokemon.id);
  }

  return {
    id: pokemon.id,
    name: pokemon.name,
    imageUrl: sprite,
  };
}

async function fetchJson(url) {
  return await (await fetch(`${BASE_URL}${url}`)).json();
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
