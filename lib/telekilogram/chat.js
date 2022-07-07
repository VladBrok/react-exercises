import { makeMessage, MESSAGE_TYPES } from "./makeMessage";
import { deleteUser, getUser, setUser } from "./users";

let server = null;

export async function handleConnection(httpServer, socket) {
  server = httpServer;

  socket.on("join-chat", handleJoinChat.bind(null, socket));
  socket.on("disconnect", handleDisconnect.bind(null, socket));
}

function handleJoinChat(socket, user) {
  emitMessage(`${user.name} connected to the chat`, MESSAGE_TYPES.CONNECT);
  setUser({ id: socket.id, ...user });
}

async function handleDisconnect(socket) {
  emitMessage(
    `${(await getUser(socket.id)).name} disconnected from the chat`,
    MESSAGE_TYPES.DISCONNECT
  );
  deleteUser(socket.id);
}

function emitMessage(text, type = "") {
  server.io.emit("message", makeMessage(text, undefined, type));
}
