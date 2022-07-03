import styles from "./Layout.module.scss";
import Head from "next/head";

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>Pokemon App {title}</title>
      </Head>
      <div className={styles.container}>{children}</div>
    </>
  );
}
