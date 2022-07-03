import fs from "fs/promises";
import path from "path";

const file = path.join(process.cwd(), "data/pokemon-app/pokemon-votes.json");

export default async function handler(req, res) {
  const buffer = await fs.readFile(file);
  const json = buffer.toString();
  const votes = JSON.parse(json);

  const id = req.query.id;
  const vote = votes.find(v => v.id === id);
  if (!vote) {
    votes.push({ id, voteCount: 1 });
  } else {
    vote.voteCount += 1;
  }

  const resultJson = JSON.stringify(votes);
  await fs.writeFile(file, resultJson);

  res.status(200).json("");
}
