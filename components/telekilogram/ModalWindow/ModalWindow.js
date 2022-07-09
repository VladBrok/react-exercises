import styles from "./ModalWindow.module.scss";
import Modal from "react-modal";

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

export default function ModalWindow({ heading, isOpen, children }) {
  return (
    <Modal isOpen={isOpen} style={customStyles}>
      <h1 className={styles.heading}>{heading}</h1>
      {children}
    </Modal>
  );
}
