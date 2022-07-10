import { save, load, RESOURCES } from "../../../lib/storage";

const RESOURCE = RESOURCES.POKEMON_VOTES;

export default async function handler(req, res) {
  const votes = await load(RESOURCE);
  const id = req.query.id;
  const vote = votes.find(v => v.id === id);

  if (!vote) {
    votes.push({ id, voteCount: 1 });
  } else {
    vote.voteCount += 1;
  }

  await save(votes, RESOURCE);
  res.status(200).json("");
}
