import { Server } from "socket.io";
import { handleConnection } from "../../lib/telekilogram/chat-server";
import { deleteUsers } from "../../lib/telekilogram/users";

export default async function handler(_, res) {
  const httpServer = res.socket.server;

  if (!httpServer.io) {
    console.log("New socket io server...");
    await deleteUsers();
    httpServer.io = new Server(httpServer, {
      path: "/api/socketio",
    });

    httpServer.io.on("connection", handleConnection.bind(null, httpServer));
  }

  res.end();
}
