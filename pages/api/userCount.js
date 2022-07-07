import { getUserCount } from "../../lib/telekilogram/users";

export default async function handler(_, res) {
  const count = await getUserCount();
  res.status(200).json({ value: count });
}
