const URL =
  "https://api.jsonstorage.net/v1/json/a2b5744f-17af-47ea-921a-3fdad1d5ebb3";

const RESOURCES = {
  POKEMON_VOTES: makeUrl("819317a3-258e-413d-80d0-d437d8d5ead9"),
  USERS: makeUrl("770e1cd7-6277-44c8-8eef-1e7ac73bc6f0"),
};
export { RESOURCES };

export async function load(resource) {
  const response = await fetch(resource);
  return await response.json();
}

export async function save(data, resource) {
  return await fetch(resource, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function makeUrl(url) {
  return `${URL}/${url}?apiKey=${process.env.STORAGE_API_KEY}`;
}
