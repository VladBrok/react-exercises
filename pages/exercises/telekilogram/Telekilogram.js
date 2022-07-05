import styles from "./Telekilogram.module.scss";
import Head from "next/head";
import Chat from "../../../components/telekilogram/Chat";

export default function Telekilogram() {
  return (
    <div>
      <Head>
        <title>Telekilogram</title>
        <meta
          name="description"
          content="Meet Telekilogram - new, fast, reliable messenger"
        />
      </Head>
      <Chat title="Public chat" />
    </div>
  );
}
