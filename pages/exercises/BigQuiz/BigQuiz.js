import styles from "./BigQuiz.module.scss";
import Head from "next/head";
import { useEffect, useState } from "react";
import Question from "../../../components/big-quiz/Question";
import Summary from "../../../components/big-quiz/Summary";
import Category from "../../../components/big-quiz/Category";
import Settings from "../../../components/big-quiz/Settings";

export default function BigQuiz() {
  // const [questions, setQuestions] = useState();

  // useEffect(() => {
  //   async function getQuestions() {
  //     const response = await fetch(
  //       `/api/questions?limit=1&difficulty=${DIFFICULTIES.HARD}&category=linu`
  //     );
  //     setQuestions(await response.text());
  //   }
  //   getQuestions();
  // }, []);

  return (
    <div>
      <Head>
        <title>Big Quiz</title>
        <meta
          name="description"
          content="Answer the most interesting tech questions of all time!"
        />
      </Head>

      <Category name="Linux" Icon={() => <div>Icon :)</div>} />

      <Settings />

      <Question
        number={2}
        total={5}
        correctAnswers={[{ id: 1 }]}
        description="Time's up. Answer?"
        possibleAnswers={[
          { id: 1, text: "yes" },
          { id: 2, text: "no" },
        ]}
        hasMultipleAnswers={false}
      />

      <Summary
        category="Linux"
        correctAnswers={2}
        totalAnswers={5}
        difficulty="medium"
      />
    </div>
  );
}
