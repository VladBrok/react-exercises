import styles from "./Question.module.scss";
import Checkbox from "../Checkbox/Checkbox";
import { useState, useEffect } from "react";

export default function Question({
  description,
  possibleAnswers,
  correctAnswers,
  hasMultipleAnswers,
  onQuitClick,
  onNextClick,
}) {
  const [answerId, setAnswerId] = useState();
  const [isCorrect, setIsCorrect] = useState();

  useEffect(() => {
    setAnswerId();
    setIsCorrect();
  }, [description]);

  function handleCheckClick() {
    setIsCorrect(correctAnswers.find(c => c.id === answerId) != undefined);
  }

  const checkButtonDisplay =
    answerId && isCorrect != undefined ? "none" : "block";
  const nextButtonDisplay = checkButtonDisplay === "none" ? "block" : "none";
  const resultVisibility = isCorrect == undefined ? "hidden" : "visible";
  const resultText = isCorrect ? "Correct!" : "Wrong.";

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
        <p style={{ visibility: resultVisibility }}>{resultText}</p>
        <button onClick={onQuitClick}>Quit Quiz</button>
        <button
          onClick={handleCheckClick}
          disabled={!answerId}
          style={{ display: checkButtonDisplay }}
        >
          Check
        </button>
        <button
          onClick={() => onNextClick(isCorrect)}
          style={{ display: nextButtonDisplay }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
