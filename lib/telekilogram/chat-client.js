import SocketIOClient from "socket.io-client";

export function connect(data, onMessage, onError) {
  const socket = SocketIOClient.connect("http://localhost:3000", {
    path: "/api/socketio",
  });

  socket.on("message", onMessage);
  socket.on("connect", () => {
    socket.emit("join-chat", data);
  });
  socket.on("connect_error", onError);
  socket.on("connect_failed", onError);

  return () => socket?.disconnect();
}
