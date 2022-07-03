import styles from "./PokemonApp.module.scss";
import Pokemon from "../../../components/pokemon-app/Pokemon";
import Head from "next/head";
import { getRandomPokemon } from "../../../lib/pokemon-app/getRandomPokemon";
import { useEffect, useRef, useState } from "react";

export default function PokemonApp() {
  const [pokemons, setPokemons] = useState();
  const firstRef = useRef();
  const secondRef = useRef();
  const headingRef = useRef();

  useEffect(() => {
    getPokemons();
  }, []);
  useEffect(() => {
    changeOpacity(1);
  }, [pokemons]);

  function changeOpacity(value) {
    if (pokemons) {
      firstRef.current.style.opacity = secondRef.current.style.opacity = value;
      headingRef.current.focus();
    }
  }

  async function getPokemons() {
    changeOpacity(0);
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
        <h1 className={styles.heading} ref={headingRef} tabIndex={0}>
          Which Pokemon is Prettier?
        </h1>
        {pokemons ? (
          <div className={styles["pokemon-container"]}>
            <div ref={firstRef} className={styles.pokemon}>
              <Pokemon {...pokemons.first} onClick={getPokemons} />
            </div>
            <span className={styles.highlight}>or</span>
            <div ref={secondRef} className={styles.pokemon}>
              <Pokemon {...pokemons.second} onClick={getPokemons} />
            </div>{" "}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}
