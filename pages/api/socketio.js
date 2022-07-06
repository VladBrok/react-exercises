import { Server } from "socket.io";
import { makeMessage } from "../../lib/telekilogram/makeMessage";

const users = new Map();
let server = null;

export default function handler(_, res) {
  const httpServer = res.socket.server;

  if (!httpServer.io) {
    console.log("New socket io server...");
    httpServer.io = new Server(httpServer, {
      path: "/api/socketio",
    });

    server = httpServer;
    httpServer.io.on("connection", handleConnection);
  }

  res.end();
}

function handleConnection(socket) {
  users.set(socket.id, null);
  socket.on("join-chat", handleJoinChat.bind(null, socket));
  socket.on("disconnect", handleDisconnect.bind(null, socket));
}

function handleJoinChat(socket, user) {
  emitMessage(`${user.name} connected to the chat`);
  users.set(socket.id, user);
}

function handleDisconnect(socket) {
  emitMessage(`${users.get(socket.id).name} disconnected from the chat`);
  users.delete(socket.id);
}

function emitMessage(text) {
  server.io.emit("message", makeMessage(text));
}
