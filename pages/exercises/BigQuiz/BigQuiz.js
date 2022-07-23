import styles from "./BigQuiz.module.scss";
import Head from "next/head";
import { useState } from "react";
import Category from "../../../components/big-quiz/Category";
import Settings from "../../../components/big-quiz/Settings";
import Quiz from "../../../components/big-quiz/Quiz";
import { FaLinux } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { SiGnubash } from "react-icons/si";
import { FaDocker } from "react-icons/fa";
import Image from "next/image";

const CATEGORIES = [
  { name: "Linux", icon: FaLinux },
  { name: "MySql", icon: FaDatabase },
  { name: "HTML", icon: FaHtml5 },
  { name: "Bash", icon: SiGnubash },
  { name: "Docker", icon: FaDocker },
];

export default function BigQuiz() {
  const [category, setCategory] = useState();
  const [difficulty, setDifficulty] = useState();
  const [limit, setLimit] = useState();

  function handleCategoryClick(value) {
    setCategory(value);
  }

  function handleStartClick(difficultyValue, limitValue) {
    setDifficulty(difficultyValue);
    setLimit(limitValue);
  }

  function handleQuitClick() {
    setCategory();
    setDifficulty();
    setLimit();
  }

  const categories = CATEGORIES.map(c => (
    <Category
      key={c.name}
      name={c.name}
      Icon={c.icon}
      onClick={handleCategoryClick}
    />
  ));

  return (
    <div className={styles.container}>
      <Head>
        <title>Big Quiz</title>
        <meta
          name="description"
          content="Answer the most interesting tech questions of all time!"
        />
      </Head>

      {!category && (
        <div className={styles.category}>
          <div className={styles.hero}>
            <Image
              src="/images/questions.png"
              alt=""
              width={100}
              height={100}
              objectFit="cover"
              loading="eager"
            />
            <h1 className={styles.title}>Answer questions &amp; Win</h1>
          </div>
          <section className={styles["inner-container"]}>
            <h2 className={styles["categories-title"]}>Categories</h2>
            <ul className={styles.categories}>{categories}</ul>
          </section>
        </div>
      )}

      {category && !difficulty && <Settings onStartClick={handleStartClick} />}

      {category && difficulty && (
        <Quiz
          onQuitClick={handleQuitClick}
          {...{ category, difficulty, limit }}
        />
      )}
    </div>
  );
}
