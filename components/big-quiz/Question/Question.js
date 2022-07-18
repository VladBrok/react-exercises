import styles from "./Question.module.scss";
import Checkbox from "../Checkbox/Checkbox";

export default function Question({
  description,
  possibleAnswers,
  correctAnswers,
  hasMultipleAnswers,
  onQuitClick,
}) {
  function handleCheckClick() {}

  return (
    <div>
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
