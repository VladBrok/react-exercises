import styles from "./Settings.module.scss";
import Checkbox from "../Checkbox";
import { useRef, useState } from "react";

const DIFFICULTIES = ["easy", "medium", "hard"];

export default function Settings({ onStartClick }) {
  const [difficultyId, setDifficultyId] = useState(DIFFICULTIES[0]);
  const limitRef = useRef();

  function handleChecked(id) {
    setDifficultyId(id);
  }

  function handleStartClick() {
    onStartClick(difficultyId, limitRef.current?.value);
  }

  const difficulties = DIFFICULTIES.map(d => ({ id: d, text: d }));

  return (
    <div>
      <Checkbox
        description="Difficulty:"
        hasMultipleOptions={false}
        options={difficulties}
        checkedId={difficultyId}
        onChecked={handleChecked}
      />
      <div>
        <label htmlFor="limit">Questions limit:</label>
        <input
          type="number"
          min="1"
          max="20"
          id="limit"
          name="limit"
          defaultValue={2}
          ref={limitRef}
        />
      </div>
      <button onClick={handleStartClick}>Let's Go!</button>
    </div>
  );
}
