import styles from "./Category.module.scss";

export default function Category({ name, Icon, onClick }) {
  function handleClick() {
    onClick(name);
  }

  return (
    <li>
      <button onClick={handleClick}>
        <Icon />
        <h3>{name}</h3>
      </button>
    </li>
  );
}
