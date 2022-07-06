import { handlePost } from "../../lib/telekilogram/handlePost";

export default function handler(req, res) {
  handlePost(req, res, req.body);
}
