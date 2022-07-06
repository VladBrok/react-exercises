import { makeMessage } from "./makeMessage";
import { deleteUser, getUser, setUser } from "./users";

let server = null;

export async function handleConnection(httpServer, socket) {
  server = httpServer;
  await setUser({ id: socket.id, name: null });

  socket.on("join-chat", handleJoinChat.bind(null, socket));
  socket.on("disconnect", handleDisconnect.bind(null, socket));
}

async function handleJoinChat(socket, user) {
  emitMessage(`${user.name} connected to the chat`);
  await setUser({ id: socket.id, ...user });
}

async function handleDisconnect(socket) {
  emitMessage(`${(await getUser(socket.id)).name} disconnected from the chat`);
  await deleteUser(socket.id);
}

function emitMessage(text) {
  server.io.emit("message", makeMessage(text));
}
