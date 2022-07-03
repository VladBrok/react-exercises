const BASE_URL = `https://pokeapi.co/api/v2/`;
const NUM_POKEMONS = 100;

export async function fetchJson(url) {
  return await (await fetch(`${BASE_URL}${url}`)).json();
}

export async function getNumPokemons() {
  // return (await fetchJson(`pokemon-species/?limit=0`)).count;
  return NUM_POKEMONS;
}

export async function getPokemon(id) {
  const pokemon = await fetchJson(`pokemon/${id}`);
  return {
    id: pokemon.id,
    name: pokemon.name,
    imageUrl: pokemon.sprites.front_default,
  };
}

export async function getAllPokemons() {
  const result = [];
  const count = await getNumPokemons();

  for (let id = 1; id <= count; id++) {
    const pokemon = await getPokemon(id);
    if (pokemon.imageUrl) {
      result.push(pokemon);
    }
  }

  return result;
}
