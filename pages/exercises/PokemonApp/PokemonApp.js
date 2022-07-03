import styles from "./PokemonApp.module.scss";
import PokemonContainer from "../../../components/pokemon-app/PokemonContainer";
import { getRandomPokemon } from "../../../lib/pokemon-app/getRandomPokemon";
import { useEffect, useRef, useState } from "react";
import Layout from "../../../components/pokemon-app/Layout";

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
    <Layout>
      <h1 className={styles.heading} ref={headingRef} tabIndex={0}>
        Which Pokemon is Prettier?
      </h1>
      {pokemons ? (
        <div className={styles["pokemon-container"]}>
          <div ref={firstRef} className={styles.pokemon}>
            <PokemonContainer {...pokemons.first} onClick={getPokemons} />
          </div>
          <span className={styles.highlight}>or</span>
          <div ref={secondRef} className={styles.pokemon}>
            <PokemonContainer {...pokemons.second} onClick={getPokemons} />
          </div>{" "}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </Layout>
  );
}
