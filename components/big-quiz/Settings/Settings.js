import styles from "./Settings.module.scss";
import Checkbox from "../Checkbox";
import { useState } from "react";

const DIFFICULTIES = ["easy", "medium", "hard"];

export default function Settings({ onStartClick }) {
  const [difficultyId, setDifficultyId] = useState(DIFFICULTIES[0]);
  const [limit, setLimit] = useState("10");

  function handleCheckedChange(id, isChecked) {
    if (isChecked) {
      setDifficultyId(id);
    }
  }

  function handleStartClick() {
    onStartClick(difficultyId, limit);
  }

  function handleLimitChange(e) {
    setLimit(e.target.value);
  }

  const difficulties = DIFFICULTIES.map(d => ({ id: d, text: d }));

  return (
    <div>
      <Checkbox
        description="Difficulty:"
        hasMultipleOptions={false}
        options={difficulties}
        checkedIds={[difficultyId]}
        onCheckedChange={handleCheckedChange}
      />
      <div>
        <label htmlFor="limit">Questions limit:</label>
        <input
          type="number"
          min="1"
          max="20"
          id="limit"
          name="limit"
          value={limit}
          onChange={handleLimitChange}
        />
      </div>
      <button onClick={handleStartClick} disabled={!limit}>
        Let's Go!
      </button>
    </div>
  );
}
