import styles from "./index.module.scss";
import Head from "next/head";
import Link from "next/link";
import { getExercises } from "../lib/getExercises";
import { formatName } from "../lib/formatName";

export async function getStaticProps() {
  const exercises = await getExercises();
  return {
    props: {
      exercises,
    },
  };
}

export default function Home({ exercises }) {
  const exerciseList = exercises.map(e => (
    <li key={e.name} className={styles.exercise}>
      <Link href={`/exercises/${e.name}`}>
        <a className={styles.link}>{formatName(e.name)}</a>
      </Link>
    </li>
  ));

  return (
    <div className={styles.container}>
      <Head>
        <title>React Exercises</title>
      </Head>
      <h1 className={styles.heading}>All Exercises</h1>
      <ul className={styles.exercises}>{exerciseList}</ul>
    </div>
  );
}
