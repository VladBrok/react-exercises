import Head from "next/head";
import Chat from "../../../components/telekilogram/Chat";
import ModalWindow from "../../../components/telekilogram/ModalWindow";
import styles from "./Telekilogram.module.scss";
import { useState } from "react";

export default function Telekilogram() {
  const [userName, setUserName] = useState();
  const [error, setError] = useState(true);

  async function handleSubmit(userName) {
    const error = await getErrorMessage(userName);
    setError(error);
    setUserName(userName);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Telekilogram</title>
        <meta
          name="description"
          content="Meet Telekilogram - new, fast, reliable messenger"
        />
      </Head>
      <ModalWindow
        onSubmit={handleSubmit}
        isOpen={Boolean(error)}
        error={error}
      />
      {!error && <Chat title="Public chat" userName={userName} />}
    </div>
  );
}

async function getErrorMessage(userName) {
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
