import styles from "./index.module.scss";
import Head from "next/head";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>React Exercises</title>
      </Head>
      <h1 className={styles.heading}>All Exercises</h1>
      <ul className={styles.exercises}>
        <li className={styles.exercise}>1</li>
        <li className={styles.exercise}>2</li>
        <li className={styles.exercise}>3</li>
        <li className={styles.exercise}>4</li>
        <li className={styles.exercise}>5</li>
        <li className={styles.exercise}>6</li>
        <li className={styles.exercise}>7</li>
        <li className={styles.exercise}>8</li>
        <li className={styles.exercise}>9</li>
        <li className={styles.exercise}>10</li>
      </ul>
    </div>
  );
}
