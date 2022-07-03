const BASE_URL = `https://pokeapi.co/api/v2/`;

export async function fetchJson(url) {
  const response = await fetch(`${BASE_URL}${url}`);
  return await response.json();
}

export async function getNumPokemons() {
  return (await fetchJson(`pokemon-species/?limit=0`)).count;
}

export async function getPokemon(id) {
  const pokemon = await fetchJson(`pokemon/${id}`);
  return {
    id: pokemon.id,
    name: pokemon.name,
    imageUrl: pokemon.sprites.front_default,
  };
}
