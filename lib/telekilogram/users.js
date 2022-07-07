import fs from "fs/promises";
import path from "path";

const fullPath = path.join(process.cwd(), "data/telekilogram/users.json");

export async function alreadyInChat(userName) {
  const lower = userName.toLowerCase();
  const users = await getUsers();
  return users.some(u => u.name?.toLowerCase() === lower);
}

export async function setUser(user) {
  const users = await getUsers();
  users.push(user);
  await save(users);
}

export async function deleteUser(id) {
  const users = await getUsers();
  await save(users.filter(u => u.id !== id));
}

export async function getUser(id) {
  const users = await getUsers();
  return users.find(u => u.id === id);
}

export async function getUserCount() {
  return (await getUsers()).length;
}

function save(users) {
  return fs.writeFile(fullPath, JSON.stringify(users));
}

async function getUsers() {
  const json = await fs.readFile(fullPath);
  return JSON.parse(json);
}