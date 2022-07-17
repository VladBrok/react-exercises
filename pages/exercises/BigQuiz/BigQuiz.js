import styles from "./BigQuiz.module.scss";
import Head from "next/head";
import { useEffect, useState } from "react";

const DIFFICULTIES = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
};

export default function BigQuiz() {
  const [questions, setQuestions] = useState();

  useEffect(() => {
    async function getQuestions() {
      const response = await fetch(
        `/api/questions?limit=1&difficulty=${DIFFICULTIES.HARD}&category=linu`
      );
      setQuestions(await response.text());
    }
    getQuestions();
  }, []);

  return (
    <div>
      <Head>
        <title>Big Quiz</title>
        <meta
          name="description"
          content="Answer the most interesting tech questions of all time!"
        />
      </Head>
      <h1>Tech questions</h1>
      <p>{questions}</p>
    </div>
  );
}
