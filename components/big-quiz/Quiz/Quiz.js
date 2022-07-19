import styles from "./Quiz.module.scss";
import Question from "../Question";
import Summary from "../Summary";
import { useEffect, useState } from "react";

export default function Quiz({ limit, category, difficulty, onQuitClick }) {
  const [questions, setQuestions] = useState();
  const [current, setCurrent] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    async function getQuestions() {
      const response = await fetch(
        `/api/questions?limit=${limit}&difficulty=${difficulty}&tags=${category}`
      );
      setQuestions(await response.json());
    }
    getQuestions();
  }, []);

  function handleNextClick(isCorrect) {
    if (isCorrect) {
      setCorrectCount(cur => cur + 1);
    }
    setCurrent(cur => cur + 1);
  }

  let content;

  if (!questions) {
    content = "Loading...";
  } else if (current >= questions.length) {
    content = (
      <Summary
        correctAnswers={correctCount}
        category={category}
        totalAnswers={limit}
        difficulty={difficulty}
        onTakeNewQuizClick={onQuitClick}
      />
    );
  } else {
    const question = questions[current];
    content = (
      <>
        <header className={styles.header}>
          <h1 className={styles.title}>
            Question{" "}
            <span className={styles["current-question"]}>{current + 1}</span>
            <span className={styles.limit}>/{limit}</span>
          </h1>
        </header>
        <Question
          correctAnswers={extractCorrectAnswers(question)}
          description={question.question}
          possibleAnswers={extractPossibleAnswers(question)}
          hasMultipleAnswers={question.multiple_correct_answers === "true"}
          onQuitClick={onQuitClick}
          onNextClick={handleNextClick}
        />
      </>
    );
  }

  return <div className={styles.container}>{content}</div>;
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
