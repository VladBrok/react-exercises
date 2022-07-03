import styles from "./Results.module.scss";
import Layout from "../../../../components/pokemon-app/Layout";
import Pokemon from "../../../../components/pokemon-app/Pokemon";

export default function Results() {
  return (
    <Layout>
      <h1 className={styles.heading}>Results</h1>
      <ul className={styles.list}>
        <li className={styles["list-item"]}>
          <span className={styles.number}>1</span>
          <div className={styles["pokemon-container"]}>
            <Pokemon
              imageSize={55}
              name="joe"
              imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg"
            />
          </div>
          <span className={styles.percentage}>70%</span>
        </li>
      </ul>
    </Layout>
  );
}
