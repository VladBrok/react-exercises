import styles from "./Question.module.scss";
import Checkbox from "../Checkbox/Checkbox";
import { useState, useEffect, useRef } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";

export default function Question({
  description,
  possibleAnswers,
  correctAnswers,
  hasMultipleAnswers,
  onQuitClick,
  onNextClick,
}) {
  const [answerIds, setAnswerIds] = useState([]);
  const [isCorrect, setIsCorrect] = useState();
  const checkButtonRef = useRef();
  const nextButtonRef = useRef();

  useEffect(() => {
    setAnswerIds([]);
    setIsCorrect();
  }, [description]);

  useEffect(() => {
    function handleKeydown(e) {
      if (e.ctrlKey && e.code === "ArrowRight" && answerIds.length) {
        clickButton();
        return;
      }

      if (e.code === "Escape") {
        onQuitClick();
      }
    }

    function clickButton() {
      const toClick =
        checkButtonRef.current?.style.display === "none"
          ? nextButtonRef
          : checkButtonRef;
      toClick.current?.click();
    }

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [answerIds]);

  function handleCheckClick() {
    setIsCorrect(
      correctAnswers.length === answerIds.length &&
        correctAnswers.every(c => answerIds.includes(c.id))
    );
  }

  function handleCheckedChange(answerId, isChecked) {
    if (isChecked) {
      setAnswerIds(ids => [...ids, answerId]);
    } else {
      setAnswerIds(ids => ids.filter(id => id !== answerId));
    }
  }

  const checkButtonDisplay =
    answerIds.length && isCorrect != undefined ? "none" : "block";
  const nextButtonDisplay = checkButtonDisplay === "none" ? "block" : "none";
  const resultVisibility = isCorrect == undefined ? "hidden" : "visible";
  const resultText = isCorrect ? "Correct!" : "Wrong.";

  return (
    <div className={styles.container}>
      <Checkbox
        description={description}
        hasMultipleOptions={hasMultipleAnswers}
        options={possibleAnswers}
        checkedIds={answerIds}
        onCheckedChange={handleCheckedChange}
      />

      <div>
        <p className={styles.result} style={{ visibility: resultVisibility }}>
          {resultText}
        </p>
        <div className={styles["buttons-container"]}>
          <button className={styles["quit-button"]} onClick={onQuitClick}>
            <AiOutlinePoweroff className={styles["quit-icon"]} /> Quit Quiz
            (Esc)
          </button>
          <button
            className={styles.button}
            onClick={handleCheckClick}
            disabled={!answerIds.length}
            style={{ display: checkButtonDisplay }}
            ref={checkButtonRef}
          >
            {"Check (Ctrl + ->)"}
          </button>
          <button
            className={styles.button}
            onClick={() => onNextClick(isCorrect)}
            style={{ display: nextButtonDisplay }}
            ref={nextButtonRef}
          >
            {"Next (Ctrl + ->)"}
          </button>
        </div>
      </div>
    </div>
  );
}
