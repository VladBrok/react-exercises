export function handlePost(req, res, message) {
  switch (req.method) {
    case "POST":
      res.socket.server.io.emit("message", message);
      res.status(201).json("");
      break;
  }
}
