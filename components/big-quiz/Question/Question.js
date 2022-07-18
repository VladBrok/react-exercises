import styles from "./Question.module.scss";
import Checkbox from "../Checkbox/Checkbox";
import { useState, useEffect } from "react";

export default function Question({
  description,
  possibleAnswers,
  correctAnswers,
  explanation,
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
    setIsCorrect(correctAnswers.find(c => c.id === answerId));
    // console.log("Correct!");
    // console.log(`Wrong. ${explanation}`);
  }

  const checkButtonDisplay =
    answerId && isCorrect != undefined ? "none" : "block";
  const nextButtonDisplay = checkButtonDisplay === "none" ? "block" : "none";

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
        <button
          onClick={handleCheckClick}
          disabled={!answerId}
          style={{ display: checkButtonDisplay }}
        >
          Check
        </button>
        <button onClick={onNextClick} style={{ display: nextButtonDisplay }}>
          Next
        </button>
      </div>
    </div>
  );
}
