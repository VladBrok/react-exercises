import ModalWindow from "../ModalWindow/ModalWindow";
import styles from "./ErrorWindow.module.scss";

export default function ErrorWindow({ message, isOpen }) {
  return (
    <ModalWindow isOpen={isOpen} heading="Telekilogram">
      <div className={styles.container}>
        <p>{message}</p>
      </div>
    </ModalWindow>
  );
}
