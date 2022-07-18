import styles from "./Checkbox.module.scss";
import { useId, useState } from "react";

export default function Checkbox({
  description,
  hasMultipleOptions,
  options,
  checkedIds,
  onCheckedChange,
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
        checked={checkedIds.includes(o.id)}
        onChange={e => {
          onCheckedChange(o.id, e.target.checked);
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
