import styles from "./Button.module.scss";

export default function Button({ children, ...props }) {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
}
