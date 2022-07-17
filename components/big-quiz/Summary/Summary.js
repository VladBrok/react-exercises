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
    <div>
      <header>
        <h1>Quiz Result</h1>
        <Image
          src="/images/trophy.png"
          alt="Trophy"
          width={100}
          height={100}
          objectFit="contain"
          priority
        />
        <h2>Congratulations!</h2>
        <p>
          You have finished the <span>{category}</span> quiz on{" "}
          <span>{difficulty}</span> difficulty!
        </p>
      </header>

      <p>Your score</p>
      <span>{correctAnswers}</span>
      <span>/{totalAnswers}</span>

      <button onClick={onTakeNewQuizClick}>Take New Quiz</button>
    </div>
  );
}
