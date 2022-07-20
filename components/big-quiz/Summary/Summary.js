import styles from "./Summary.module.scss";
import Image from "next/image";

export default function Summary({
  correctAnswers,
  totalAnswers,
  category,
  difficulty,
  onTakeNewQuizClick,
}) {
  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.title}>Quiz Result</h1>
        <div className={styles["image-container"]}>
          <Image
            className={styles.image}
            src="/images/trophy.png"
            alt="Trophy"
            width={100}
            height={100}
            objectFit="contain"
            priority
          />
        </div>
        <h2 className={styles.title}>Congratulations!</h2>
        <p className={styles.text}>
          You have finished the{" "}
          <span className={styles.emphasize}>{category}</span> quiz on{" "}
          <span className={styles.emphasize}>{difficulty}</span> difficulty!
        </p>
      </header>

      <div className={styles["score-container"]}>
        <p className={styles.score}>Your score:</p>
        <span className={styles["correct-answers"]}>{correctAnswers}</span>
        <span className={styles["total-answers"]}>/{totalAnswers}</span>
      </div>
      <button className={styles.button} onClick={onTakeNewQuizClick}>
        Take New Quiz
      </button>
    </div>
  );
}
