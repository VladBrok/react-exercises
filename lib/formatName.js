export function formatName(name) {
  return `${name.slice(0, 1).toUpperCase()}${name
    .slice(1)
    .replace(/([A-Z])/g, " $1")}`;
}
