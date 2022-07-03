import styles from "./Pokemon.module.scss";
import Button from "../../../components/pokemon-app/Button";
import Image from "next/image";

const IMAGE_SIZE = 160;

export default function Pokemon({ name, imageUrl, onClick }) {
  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>{name}</h2>
      <div style={{ width: `${IMAGE_SIZE}px` }}>
        <Image
          layout="responsive"
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          objectFit="contain"
          src={imageUrl}
          alt={name}
        />
      </div>
      <Button onClick={onClick}>Prettier</Button>
    </section>
  );
}
