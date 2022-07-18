import styles from "./Quiz.module.scss";
import Question from "../Question";
import { useEffect, useState } from "react";

export default function Quiz({ limit, category, difficulty, onQuitClick }) {
  const [questions, setQuestions] = useState();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    async function getQuestions() {
      const response = await fetch(
        `/api/questions?limit=${limit}&difficulty=${difficulty}&tags=${category}`
      );
      console.log(response.status);
      setQuestions(await response.json());
    }
    getQuestions();
  }, []);

  function handleNextClick() {
    setCurrent(cur => cur + 1);
  }

  if (!questions) {
    return <div></div>;
  }

  const question = questions[current];
  const questionElement = (
    <>
      <header>
        <h1>
          Question <span>{current + 1}</span>
          <span>/{limit}</span>
        </h1>
      </header>
      <Question
        correctAnswers={extractCorrectAnswers(question)}
        description={question.question}
        possibleAnswers={extractPossibleAnswers(question)}
        explanation={question.explanation}
        hasMultipleAnswers={question.multiple_correct_answers === "true"}
        onQuitClick={onQuitClick}
        onNextClick={handleNextClick}
      />
    </>
  );

  return <div>{questionElement}</div>;
}

function extractCorrectAnswers(question) {
  return Object.keys(question.correct_answers)
    .filter(k => question.correct_answers[k] === "true")
    .map(k => ({
      id: k.replace("_correct", ""),
    }));
}

function extractPossibleAnswers(question) {
  return Object.entries(question.answers)
    .filter(e => e[1])
    .map(([k, v]) => ({ id: k, text: v }));
}
