import styles from "./Category.module.scss";

export default function Category({ name, Icon, onClick }) {
  function handleClick() {
    onClick(name);
  }

  return (
    <li>
      <button className={styles.button} onClick={handleClick}>
        <Icon className={styles.icon} />
        <h3>{name}</h3>
      </button>
    </li>
  );
}
