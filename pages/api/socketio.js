import { Server } from "socket.io";

export default function handler(_, res) {
  const httpServer = res.socket.server;

  if (!httpServer.io) {
    console.log("New socket io server...");
    httpServer.io = new Server(httpServer, {
      path: "/api/socketio",
    });
  }

  res.end();
}
