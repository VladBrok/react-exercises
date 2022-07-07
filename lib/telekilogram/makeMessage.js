import { nanoid } from "nanoid";

export function makeMessage(text, from = undefined, type = "") {
  const nowStr = new Date().toLocaleTimeString();
  const now = nowStr.slice(0, nowStr.lastIndexOf(":"));

  return {
    id: nanoid(),
    time: now,
    from,
    text,
    type,
  };
}

const MESSAGE_TYPES = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
};

export { MESSAGE_TYPES };
