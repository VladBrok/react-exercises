import { alreadyInChat } from "../../../lib/telekilogram/users";

export default async function handler({ query: { userName } }, res) {
  const yes = await alreadyInChat(userName);
  res.status(200).json({ yes });
}
