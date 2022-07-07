import { nanoid } from "nanoid";

export function makeMessage(text, from = undefined) {
  const nowStr = new Date().toLocaleTimeString();
  const now = nowStr.slice(0, nowStr.lastIndexOf(":"));

  return {
    id: nanoid(),
    time: now,
    from,
    text,
  };
}
