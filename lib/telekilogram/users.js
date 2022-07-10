import { save, load, RESOURCES } from "../../lib/storage";

export async function alreadyInChat(userName) {
  const lower = userName.toLowerCase();
  const users = await getUsers();
  return users.some(u => u.name?.toLowerCase() === lower);
}

export async function setUser(user) {
  const users = await getUsers();
  users.push(user);
  await saveUsers(users);
}

export async function deleteUser(id) {
  const users = await getUsers();
  await saveUsers(users.filter(u => u.id !== id));
}

export function deleteUsers() {
  return saveUsers([]);
}

export async function getUser(id) {
  const users = await getUsers();
  return users.find(u => u.id === id);
}

export async function getUserCount() {
  return (await getUsers()).length;
}

function saveUsers(users) {
  return save(users, RESOURCES.USERS);
}

function getUsers() {
  return load(RESOURCES.USERS);
}
