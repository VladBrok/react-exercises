import styles from "./Category.module.scss";

export default function Category({ name, Icon, onClick }) {
  return (
    <li>
      <button onClick={onClick}>
        <Icon />
        <h3>{name}</h3>
      </button>
    </li>
  );
}
