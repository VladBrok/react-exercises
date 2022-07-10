import { Server } from "socket.io";
import { handleConnection } from "../../lib/telekilogram/chat-server";
import { deleteUsers } from "../../lib/telekilogram/users";

let initializing = false;

export default async function handler(_, res) {
  const httpServer = res.socket.server;
  console.log(initializing);
  console.log(httpServer);
  console.log(httpServer.io);

  if (!httpServer.io && !initializing) {
    initializing = true;
    console.log("New socket io server...");
    await deleteUsers();
    httpServer.io = new Server(httpServer, {
      path: "/api/socketio",
    });

    httpServer.io.on("connection", handleConnection.bind(null, httpServer));
  }

  res.end();
}
