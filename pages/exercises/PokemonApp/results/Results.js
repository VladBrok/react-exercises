import styles from "./Results.module.scss";
import Layout from "../../../../components/pokemon-app/Layout";
import Pokemon from "../../../../components/pokemon-app/Pokemon";
import { getPokemonsWithVotes } from "../../../../lib/pokemon-app/getPokemonsWithVotes";

export async function getServerSideProps() {
  const pokemons = await getPokemonsWithVotes();
  return {
    props: {
      pokemons,
    },
  };
}

export default function Results({ pokemons }) {
  const pokemonsList = pokemons.map((p, i) => (
    <li className={styles["list-item"]} key={p.id}>
      <span className={styles.number}>{i + 1}</span>
      <div className={styles["pokemon-container"]}>
        <Pokemon imageUrl={p.imageUrl} name={p.name} imageSize="50" />
      </div>
      <span className={styles.percentage}>{p.percentage}</span>
    </li>
  ));

  return (
    <Layout>
      <h1 className={styles.heading}>Results</h1>
      <ul className={styles.list}>{pokemonsList}</ul>
    </Layout>
  );
}
