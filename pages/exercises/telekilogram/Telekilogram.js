import Head from "next/head";
import Chat from "../../../components/telekilogram/Chat";
import ModalWindow from "../../../components/telekilogram/ModalWindow";
import { useEffect, useState } from "react";

export default function Telekilogram() {
  const [userName, setUserName] = useState();
  const [error, setError] = useState();
  const [isModalOpen, setIsModalOpen] = useState(true); // TODO: remove?

  useEffect(() => {
    checkError();
  }, [userName]);

  async function checkError() {
    const error = await getErrorMessage(userName);
    if (userName && !error) {
      setIsModalOpen(false);
    }
    setError(error);
  }

  function handleSubmit(userName) {
    setUserName(userName);
  }

  return (
    <div>
      <Head>
        <title>Telekilogram</title>
        <meta
          name="description"
          content="Meet Telekilogram - new, fast, reliable messenger"
        />
      </Head>
      <ModalWindow onSubmit={handleSubmit} isOpen={isModalOpen} error={error} />
      {!isModalOpen && <Chat title="Public chat" userName={userName} />}
    </div>
  );
}

async function getErrorMessage(userName) {
  if (userName === undefined) {
    return null;
  }
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
