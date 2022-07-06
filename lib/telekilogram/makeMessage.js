import { nanoid } from "nanoid";

export function makeMessage(text, from = undefined) {
  return {
    id: nanoid(),
    from,
    text,
  };
}
