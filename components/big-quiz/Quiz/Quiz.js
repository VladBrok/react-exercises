import styles from "./Quiz.module.scss";
import Question from "../Question";
import { useEffect, useState } from "react";

export default function Quiz({ limit, category, difficulty, onQuitClick }) {
  const [questions, setQuestions] = useState();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    async function getQuestions() {
      const response = await fetch(
        `/api/questions?limit=${limit}&difficulty=${difficulty}&category=${category}`
      );
      setQuestions(await response.json());
    }
    getQuestions();
  }, []);

  if (!questions) {
    return null;
  }

  const question = questions[current];
  const questionElement = (
    <Question
      number={current + 1}
      total={limit}
      correctAnswers={Object.keys(question.correct_answers)
        .filter(k => question.correct_answers[k] === "true")
        .map(k => ({
          id: k,
        }))}
      description={question.question}
      possibleAnswers={Object.entries(question.answers)
        .filter(e => e[1])
        .map(([k, v]) => ({ id: k, text: v }))}
      hasMultipleAnswers={question.multiple_correct_answers === "true"}
      onQuitClick={onQuitClick}
    />
  );

  return <div>{questionElement}</div>;
}
