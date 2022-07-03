import styles from "./Pokemon.module.scss";
import Image from "next/image";

export default function Pokemon({ name, imageUrl, imageSize }) {
  return (
    <>
      <h2 className={styles.heading}>{name}</h2>
      <div style={{ width: `${imageSize}px` }}>
        <Image
          layout="responsive"
          width={imageSize}
          height={imageSize}
          objectFit="contain"
          src={imageUrl}
          alt={name}
        />
      </div>
    </>
  );
}
