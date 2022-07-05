import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.scss";
import SocketIOClient from "socket.io-client";

export default function Chat({ title }) {
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef();

  useEffect(() => {
    messagesRef.current.scroll(0, messagesRef.current.scrollHeight);
  }, [messages]);
  useEffect(() => {
    const socket = SocketIOClient.connect("http://localhost:3000", {
      path: "/api/socketio",
    });
    socket.on("connect", () => {
      console.log("Connected to socket");
    });
    socket.on("message", message => {
      setMessages(current => [...current, message]);
    });

    return () => socket?.disconnect();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const input = e.target.elements.message;
    const messageText = input.value;
    if (!messageText) {
      return;
    }

    input.value = "";
    const message = {
      id: nanoid(),
      text: messageText,
      from: "Anonymous",
    };
    fetch("/api/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
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
