import { Server } from "socket.io";
import { handleConnection } from "../../lib/telekilogram/chat-server";

export default function handler(_, res) {
  const httpServer = res.socket.server;

  if (!httpServer.io) {
    console.log("New socket io server...");
    httpServer.io = new Server(httpServer, {
      path: "/api/socketio",
    });

    httpServer.io.on("connection", handleConnection.bind(null, httpServer));
  }

  res.end();
}
