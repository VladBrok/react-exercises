import { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.scss";
import SocketIOClient from "socket.io-client";
import { makeMessage } from "../../../lib/telekilogram/makeMessage";
import { post } from "../../../lib/telekilogram/post";
import { formatMessage } from "../../../lib/telekilogram/formatMessage";

export default function Chat({ title }) {
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef();

  useEffect(scrollMessagesToBottom, [messages]);
  useEffect(connectToServer, []);

  function scrollMessagesToBottom() {
    messagesRef.current.scroll(0, messagesRef.current.scrollHeight);
  }

  function connectToServer() {
    const socket = SocketIOClient.connect("http://localhost:3000", {
      path: "/api/socketio",
    });
    socket.on("message", message => {
      setMessages(current => [...current, message]);
    });
    socket.on("connect", () => {
      socket.emit("join-chat", { name: "alkash" });
    });

    return () => socket?.disconnect();
  }

  function handleSubmit(e) {
    e.preventDefault();

    const input = e.target.elements.message;
    const messageText = input.value;
    if (!messageText) {
      return;
    }

    input.value = "";
    post("send-message", makeMessage(messageText, "Anonymous"));
  }

  const messagesList = messages.map(m => (
    <li className={styles.message} key={m.id}>
      {formatMessage(m)}
    </li>
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
