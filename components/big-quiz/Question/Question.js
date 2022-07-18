import styles from "./Question.module.scss";
import Checkbox from "../Checkbox/Checkbox";
import { useState, useEffect, useRef } from "react";

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
  const checkButtonRef = useRef();
  const nextButtonRef = useRef();

  useEffect(() => {
    setAnswerId();
    setIsCorrect();
  }, [description]);

  useEffect(() => {
    function handleKeydown(e) {
      if (e.ctrlKey && e.code === "ArrowRight" && answerId) {
        const toClick =
          checkButtonRef.current?.style.display === "none"
            ? nextButtonRef
            : checkButtonRef;
        toClick.current?.click();
        return;
      }

      if (e.code === "Escape") {
        onQuitClick();
      }
    }
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [answerId]);

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
        <button onClick={onQuitClick}>Quit Quiz (Esc)</button>
        <button
          onClick={handleCheckClick}
          disabled={!answerId}
          style={{ display: checkButtonDisplay }}
          ref={checkButtonRef}
        >
          {"Check (Ctrl + ->)"}
        </button>
        <button
          onClick={() => onNextClick(isCorrect)}
          style={{ display: nextButtonDisplay }}
          ref={nextButtonRef}
        >
          {"Next (Ctrl + ->)"}
        </button>
      </div>
    </div>
  );
}
