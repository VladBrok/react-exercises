import { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.scss";
import { makeMessage } from "../../../lib/telekilogram/makeMessage";
import { post } from "../../../lib/telekilogram/post";
import Form from "../Form";
import Message from "../Message";
import { connect } from "../../../lib/telekilogram/chat-client";

export default function Chat({ title, userName }) {
  const [messages, setMessages] = useState([]);
  const [memberCount, setMemberCount] = useState(0);
  const messagesRef = useRef();
  const inputRef = useRef();

  useEffect(scrollMessagesToBottom, [messages]);
  useEffect(focusOnInput, []);
  useEffect(() => {
    adjustMemberCount();
  });
  useEffect(connectToServer, []);

  function scrollMessagesToBottom() {
    messagesRef.current.scroll(0, messagesRef.current.scrollHeight);
  }

  function focusOnInput() {
    inputRef.current?.focus();
  }

  async function adjustMemberCount() {
    const count = await (await fetch("/api/userCount")).json();
    setMemberCount(count.value);
  }

  function connectToServer() {
    return connect({ name: userName }, message => {
      setMessages(current => [...current, message]);
    });
  }

  function handleSubmit(e) {
    const input = e.target.elements.message;
    const messageText = input.value;
    if (!messageText) {
      return;
    }

    input.value = "";
    post("send-message", makeMessage(messageText, userName));
    focusOnInput();
  }

  const messagesList = messages.map(m => (
    <Message message={m} userName={userName} key={m.id} />
  ));

  return (
    <div className={styles.container}>
      <section className={styles["title-container"]}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.members}>{memberCount} members</p>
      </section>

      <ul className={styles.messages} ref={messagesRef}>
        {messagesList}
      </ul>

      <Form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Message"
          name="message"
          ref={inputRef}
        />
        <button className={styles.send}>Send</button>
      </Form>
    </div>
  );
}
