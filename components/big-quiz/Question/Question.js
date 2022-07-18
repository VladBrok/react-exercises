import styles from "./Question.module.scss";
import Checkbox from "../Checkbox/Checkbox";
import { useState } from "react";

export default function Question({
  description,
  possibleAnswers,
  correctAnswers,
  hasMultipleAnswers,
  onQuitClick,
}) {
  const [answerId, setAnswerId] = useState();

  function handleCheckClick() {
    if (correctAnswers.find(c => c.id === answerId)) {
      console.log("correct!");
    } else {
      console.log("wrong");
    }
  }

  return (
    <div>
      <Checkbox
        description={description}
        hasMultipleOptions={hasMultipleAnswers}
        options={possibleAnswers}
        checkedId={answerId}
        onChecked={setAnswerId}
      />

      <div>
        <button onClick={onQuitClick}>Quit Quiz</button>
        <button onClick={handleCheckClick} disabled={!answerId}>
          Check
        </button>
      </div>
    </div>
  );
}
