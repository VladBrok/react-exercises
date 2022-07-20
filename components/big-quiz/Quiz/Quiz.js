import styles from "./Quiz.module.scss";
import Question from "../Question";
import Summary from "../Summary";
import QuizProgress from "../QuizProgress";
import { useEffect, useState } from "react";

export default function Quiz({ limit, category, difficulty, onQuitClick }) {
  const [questions, setQuestions] = useState();
  const [answered, setAnswered] = useState([]);

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
    setAnswered(cur => [...cur, { isCorrect }]);
  }

  let content;

  if (!questions) {
    content = "Loading...";
  } else if (answered.length >= questions.length) {
    content = (
      <Summary
        correctAnswers={answered.filter(a => a.isCorrect).length}
        category={category}
        totalAnswers={limit}
        difficulty={difficulty}
        onTakeNewQuizClick={onQuitClick}
      />
    );
  } else {
    const question = questions[answered.length];
    content = (
      <>
        <header className={styles.header}>
          <h1 className={styles.title}>
            Question{" "}
            <span className={styles["current-question"]}>
              {answered.length + 1}
            </span>
            <span className={styles.limit}>/{limit}</span>
          </h1>
          <QuizProgress answeredQuestions={answered} questionCount={limit} />
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
