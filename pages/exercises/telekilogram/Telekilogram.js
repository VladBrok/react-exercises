import Head from "next/head";
import Chat from "../../../components/telekilogram/Chat";
import ModalWindow from "../../../components/telekilogram/ModalWindow";
import styles from "./Telekilogram.module.scss";
import { useState } from "react";
import { getErrorMessage } from "../../../lib/telekilogram/getErrorMessage";

export default function Telekilogram() {
  const [userName, setUserName] = useState();
  const [inputError, setInputError] = useState(true);

  async function handleSubmit(userName) {
    const error = await getErrorMessage(userName);
    setInputError(error);
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
        isOpen={Boolean(inputError)}
        error={inputError}
      />
      {!inputError && <Chat title="Public chat" userName={userName} />}
    </div>
  );
}
