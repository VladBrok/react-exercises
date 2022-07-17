import styles from "./Settings.module.scss";
import Checkbox from "../Checkbox";

const DIFFICULTIES = ["easy", "medium", "hard"];

export default function Settings({ onStartClick }) {
  const difficulties = DIFFICULTIES.map(d => ({ id: d, text: d }));

  return (
    <div>
      <Checkbox
        description="Difficulty:"
        hasMultipleOptions={false}
        options={difficulties}
      />
      <div>
        <label htmlFor="limit">Questions limit:</label>
        <input type="number" id="limit" name="limit" />
      </div>
      <button onClick={onStartClick}>Let's Go!</button>
    </div>
  );
}
