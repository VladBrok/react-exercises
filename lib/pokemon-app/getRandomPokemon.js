const BASE_URL = `https://pokeapi.co/api/v2/`;

export async function getRandomPokemon(disallowedId = null) {
  const numPokemons = (await fetchJson(`pokemon-species/?limit=0`)).count;
  const id = takeRandom(getAllowedIds(numPokemons, disallowedId));
  const pokemon = await fetchJson(`pokemon/${id}`);

  return {
    id: pokemon.id,
    name: pokemon.name,
    imageUrl: pokemon.sprites.front_default,
  };
}

async function fetchJson(url) {
  return await (await fetch(`${BASE_URL}${url}`)).json();
}

function takeRandom(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

function getAllowedIds(numPokemons, disallowedId) {
  return Array(numPokemons)
    .fill(0)
    .map((_, i) => i + 1)
    .filter(id => id !== disallowedId);
}
