import Head from "next/head";
import Chat from "../../../components/telekilogram/Chat";
import ModalWindow from "../../../components/telekilogram/ModalWindow";
import { useState } from "react";

export default function Telekilogram() {
  const [userName, setUserName] = useState();
  const [isModalOpen, setIsModalOpen] = useState(true);

  function handleSubmit(userName) {
    setUserName(userName);
    if (!getErrorMessage(userName)) {
      setIsModalOpen(false);
    }
  }

  const error = getErrorMessage(userName);

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
      {userName && !error && <Chat title="Public chat" userName={userName} />}
    </div>
  );
}

function getErrorMessage(userName) {
  if (userName === undefined) {
    return null;
  }
  if (!userName) {
    return "Name should not be empty";
  }
  return null;
}
