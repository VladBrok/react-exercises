import styles from "./PokemonContainer.module.scss";
import Button from "../Button";
import Pokemon from "../Pokemon";

export default function PokemonContainer({ name, imageUrl, onClick }) {
  return (
    <section className={styles.container}>
      <Pokemon imageSize={170} name={name} imageUrl={imageUrl} />
      <Button onClick={onClick}>Prettier</Button>
    </section>
  );
}
