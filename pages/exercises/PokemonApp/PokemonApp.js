import styles from "./PokemonApp.module.scss";
import Button from "../../../components/pokemon-app/Button";

export default function PokemonApp() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Which Pokemon is Prettier?</h1>
      <Button>Prettier</Button>
    </div>
  );
}
