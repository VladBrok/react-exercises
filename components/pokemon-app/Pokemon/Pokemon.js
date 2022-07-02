import styles from "./Pokemon.module.scss";
import Button from "../../../components/pokemon-app/Button";

export default function Pokemon({ name, imageUrl, onClick }) {
  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>{name}</h2>
      <img className={styles.image} src={imageUrl} alt={name} />
      <Button onClick={onClick}>Prettier</Button>
    </section>
  );
}
