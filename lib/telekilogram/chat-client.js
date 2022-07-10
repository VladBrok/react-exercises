import SocketIOClient from "socket.io-client";

export function connect(data, onMessage, onError, onConnect) {
  const socket = SocketIOClient.connect(window.location.origin, {
    path: "/api/socketio",
    reconnectionAttempts: process.env.NEXT_PUBLIC_RECONNECTION_ATTEMPTS,
  });

  for (const error of ["error"]) {
    socket.io.on(error, e => onError(`Client ${error}: ${e}`));
  }

  socket.on("message", onMessage);
  socket.on("connect", () => {
    onConnect();
    socket.emit("join-chat", data);
  });

  return () => socket?.disconnect();
}
