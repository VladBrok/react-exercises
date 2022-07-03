import styles from "./PokemonContainer.module.scss";
import Button from "../Button";
import Pokemon from "../Pokemon";

export default function PokemonContainer({ id, name, imageUrl, onClick }) {
  function handleClick(e) {
    fetch(`/api/votefor/${id}`);
    onClick(e);
  }

  return (
    <section className={styles.container}>
      <Pokemon imageSize={170} name={name} imageUrl={imageUrl} />
      <Button onClick={handleClick}>Prettier</Button>
    </section>
  );
}
