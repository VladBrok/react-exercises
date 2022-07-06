import styles from "./ModalWindow.module.scss";
import Modal from "react-modal";
import Form from "../Form";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};

Modal.setAppElement("#__next");

export default function ModalWindow({ onSubmit, isOpen, error }) {
  function handleSubmit(e) {
    onSubmit(e.target.elements.userName.value);
  }

  return (
    <Modal isOpen={isOpen} style={customStyles}>
      <h1 className={styles.heading}>Authorization</h1>
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
    </Modal>
  );
}
