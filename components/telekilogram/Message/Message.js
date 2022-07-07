import styles from "./Message.module.scss";

export default function Message({ message, userName }) {
  const style = !message.from
    ? "info-message"
    : message.from === userName
    ? "message-from-me"
    : "message-from-friend";

  return (
    <li className={styles[style]}>
      <header>
        <span className={styles.user}>{message.from}</span>
        <span className={styles.time}>{message.time}</span>
      </header>
      <p>{message.text}</p>
    </li>
  );
}
