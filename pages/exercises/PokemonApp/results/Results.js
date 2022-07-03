import styles from "./Results.module.scss";
import Layout from "../../../../components/pokemon-app/Layout";

export default function Results() {
  return (
    <Layout>
      <h1 className={styles.heading}>Results</h1>
      <div className={styles.container}></div>
    </Layout>
  );
}
