import SocketIOClient from "socket.io-client";

export function connect(data, onMessage) {
  const socket = SocketIOClient.connect("http://localhost:3000", {
    path: "/api/socketio",
  });
  socket.on("message", onMessage);
  socket.on("connect", () => {
    socket.emit("join-chat", data);
  });

  return () => socket?.disconnect();
}
