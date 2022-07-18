import styles from "./Question.module.scss";
import Checkbox from "../Checkbox/Checkbox";

export default function Question({
  number,
  total,
  description,
  possibleAnswers,
  correctAnswers,
  hasMultipleAnswers,
  onQuitClick,
}) {
  function handleCheckClick() {}

  return (
    <div>
      <header>
        <h1>
          Question <span>{number}</span>
          <span>/{total}</span>
        </h1>
      </header>

      <Checkbox
        description={description}
        hasMultipleOptions={hasMultipleAnswers}
        options={possibleAnswers}
      />

      <div>
        <button onClick={onQuitClick}>Quit Quiz</button>
        <button onClick={handleCheckClick}>Check</button>
      </div>
    </div>
  );
}
