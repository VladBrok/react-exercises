import styles from "./QuizProgress.module.scss";

export default function QuizProgress({ answeredQuestions, questionCount }) {
  const progressItems = [];

  for (let i = 0; i < questionCount; i++) {
    let style = styles.regular;
    const answeredQuestion = answeredQuestions[i];
    if (answeredQuestion) {
      style = answeredQuestion.isCorrect ? styles.correct : styles.wrong;
    }
    progressItems.push(<li key={i} className={style}></li>);
  }

  return <ul className={styles["progress-list"]}>{progressItems}</ul>;
}
