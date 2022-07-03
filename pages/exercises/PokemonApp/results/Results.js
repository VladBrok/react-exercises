import styles from "./Results.module.scss";
import Layout from "../../../../components/pokemon-app/Layout";
import Pokemon from "../../../../components/pokemon-app/Pokemon";
import { getPokemonsWithVotes } from "../../../../lib/pokemon-app/getPokemonsWithVotes";
import { useEffect, useState } from "react";

export default function Results() {
  const [pokemons, setPokemons] = useState([]);
  useEffect(lazyLoad, []);

  function lazyLoad() {
    const token = { cancellationRequested: false };
    getPokemonsWithVotes(p => {
      setPokemons(current => [...current, p]);
    }, token);

    return () => {
      token.cancellationRequested = true;
      setPokemons([]);
    };
  }

  const pokemonsList = pokemons?.map((p, i) => (
    <li className={styles["list-item"]} key={p.id}>
      <span className={styles.number}>{i + 1}</span>
      <div className={styles["pokemon-container"]}>
        <Pokemon imageUrl={p.imageUrl} name={p.name} imageSize="50" />
      </div>
      <span className={styles.percentage}>{p.percentage}</span>
    </li>
  ));

  return (
    <Layout title="Results">
      <h1 className={styles.heading}>Results</h1>
      {pokemons.length > 0 ? (
        <ul className={styles.list}>{pokemonsList}</ul>
      ) : (
        <div>Loading...</div>
      )}
    </Layout>
  );
}
