import { useId } from "react";
import styles from "./Checkbox.module.scss";

export default function Checkbox({ description, hasMultipleOptions, options }) {
  const name = useId();
  const inputType = hasMultipleOptions ? "checkbox" : "radio";
  const optionElements = options.map((o, i) => (
    <div key={o.id}>
      <label htmlFor={o.id}>{o.text}</label>
      <input type={inputType} id={o.id} name={name} defaultChecked={i === 0} />
    </div>
  ));

  return (
    <fieldset>
      <legend>{description}</legend>
      {optionElements}
    </fieldset>
  );
}
