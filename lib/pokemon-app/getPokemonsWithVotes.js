import { getPokemon } from "./utils";

export async function getPokemonsWithVotes(onGot, token) {
  const json = await (await fetch("/api/votes")).json();
  const votes = JSON.parse(json);
  const totalVotes = votes.reduce((sum, cur) => sum + cur.voteCount, 0);

  for (const [id, percentage] of votes
    .map(v => [+v.id, getPercentage(totalVotes, v.voteCount)])
    .sort((a, b) => b[1] - a[1])) {
    const pokemon = await getPokemon(id);
    if (token.cancellationRequested) {
      return;
    }
    onGot({ ...pokemon, percentage });
  }
}

function getPercentage(total, part) {
  if (!total) {
    return 0;
  }
  return +((part * 100) / total).toFixed(2);
}
