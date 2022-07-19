import styles from "./Checkbox.module.scss";
import { useId, useState, useEffect } from "react";

export default function Checkbox({
  description,
  hasMultipleOptions,
  options,
  checkedIds,
  onCheckedChange,
}) {
  const name = useId();
  const [checked, setChecked] = useState();

  useEffect(() => {
    setChecked();
  }, [description]);

  const optionElements = options.map(o => {
    const checkedValue = checkedIds.includes(o.id);
    return (
      <div
        className={`${styles["input-container"]} ${
          checkedValue ? styles.highlighted : ""
        }`}
        key={o.id}
      >
        <label className={styles.label} htmlFor={o.id}>
          {o.text}
        </label>
        <input
          className={styles.input}
          type="checkbox"
          id={o.id}
          name={name}
          checked={checkedValue}
          onChange={e => {
            const isChecked = e.target.checked;
            if (!isChecked && !hasMultipleOptions && e.isTrusted) {
              return;
            }

            const parentClasses = e.target.parentElement.classList;
            if (isChecked) {
              parentClasses.add(styles.highlighted);
              setChecked(e.target);
            } else {
              parentClasses.remove(styles.highlighted);
            }

            onCheckedChange(o.id, isChecked);
            if (isChecked && !hasMultipleOptions && checked) {
              checked.click();
            }
          }}
        />
      </div>
    );
  });
  const hint = (
    <>
      (Select{" "}
      <span className={styles.emphasize}>
        {hasMultipleOptions ? "multiple" : "one"}
      </span>{" "}
      option{hasMultipleOptions ? "s" : ""})
    </>
  );

  return (
    <fieldset className={styles.container}>
      <legend className={styles.description}>
        {description}
        <br />
        {hint}
      </legend>
      {optionElements}
    </fieldset>
  );
}
