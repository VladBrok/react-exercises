export async function getErrorMessage(userName) {
  if (!userName) {
    return "Name should not be empty";
  }

  const alreadyInChat = await (
    await fetch(`/api/alreadyInChat/${userName}`)
  ).json();
  if (alreadyInChat.yes) {
    return `User with the name ${userName} is already in the chat`;
  }

  return null;
}
