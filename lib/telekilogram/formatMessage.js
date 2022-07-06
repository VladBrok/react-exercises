export function formatMessage(msg) {
  return msg.from ? `${msg.from}: ${msg.text}` : msg.text;
}
