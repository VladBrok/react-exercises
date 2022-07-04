export function formatName(name) {
  return name.replace(/(?!^)([A-Z])/g, " $1");
}
