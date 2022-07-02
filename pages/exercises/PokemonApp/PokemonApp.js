import styles from "./PokemonApp.module.scss";
import Pokemon from "../../../components/pokemon-app/Pokemon";
import Head from "next/head";
import { getRandomPokemon } from "../../../lib/pokemon-app/getRandomPokemon";
import { useEffect, useState } from "react";

export default function PokemonApp() {
  const [pokemons, setPokemons] = useState();
  useEffect(() => {
    getPokemons();
  }, []);

  async function getPokemons() {
    const first = await getRandomPokemon();
    const disallowedId = first.id;
    const second = await getRandomPokemon(disallowedId);
    setPokemons({ first, second });
  }

  return (
    <>
      <Head>
        <title>Pokemon App</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.heading}>Which Pokemon is Prettier?</h1>
        {pokemons ? (
          <div className={styles["pokemon-container"]}>
            <Pokemon {...pokemons.first} onClick={getPokemons} />
            <span className={styles.highlight}>or</span>
            <Pokemon {...pokemons.second} onClick={getPokemons} />
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}
