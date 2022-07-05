import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.scss";

export default function Chat({ title }) {
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef();
  useEffect(() => {
    messagesRef.current.scroll(0, 10000);
  }, [messages]);

  function handleSubmit(e) {
    e.preventDefault();

    const input = e.target.elements.message;
    const message = input.value;
    input.value = "";

    setMessages(current => [
      ...current,
      {
        id: nanoid(),
        text: message,
        from: "Anon",
      },
    ]);
  }

  const messagesList = messages.map(m => (
    <li className={styles.message} key={m.id}>{`${m.from}: ${m.text}`}</li>
  ));

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>

      <ul className={styles.messages} ref={messagesRef}>
        {messagesList}
      </ul>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Message"
          name="message"
        />
        <button className={styles.send}>Send</button>
      </form>
    </div>
  );
}
