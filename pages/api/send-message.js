export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      const message = req.body;
      res.socket.server.io.emit("message", message);
      res.status(201).json("");
      break;
  }
}
