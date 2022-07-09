import ModalWindow from "../ModalWindow/ModalWindow";
import Form from "../Form";
import styles from "./AuthorizationWindow.module.scss";

export default function AuthorizationWindow({ isOpen, onSubmit, error }) {
  function handleSubmit(e) {
    onSubmit(e.target.elements.userName.value);
  }

  return (
    <ModalWindow isOpen={isOpen} heading="Authorization">
      <Form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="userName">Enter your name:</label>
        <input
          className={styles.input}
          type="text"
          id="userName"
          name="userName"
          autoFocus={true}
        />
      </Form>
      <p className={styles.error}>{error}</p>
    </ModalWindow>
  );
}
