import { useId, useState } from "react";
import styles from "./Checkbox.module.scss";

export default function Checkbox({
  description,
  hasMultipleOptions,
  options,
  checkedId,
  onChecked,
}) {
  const name = useId();
  const inputType = hasMultipleOptions ? "checkbox" : "radio";
  const optionElements = options.map(o => (
    <div key={o.id}>
      <label htmlFor={o.id}>{o.text}</label>
      <input
        type={inputType}
        id={o.id}
        name={name}
        checked={o.id === checkedId}
        onChange={e => {
          if (e.target.checked) {
            onChecked(o.id);
          }
        }}
      />
    </div>
  ));

  return (
    <fieldset>
      <legend>{description}</legend>
      {optionElements}
    </fieldset>
  );
}
