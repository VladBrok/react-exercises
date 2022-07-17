import styles from "./BigQuiz.module.scss";
import Head from "next/head";
import { useEffect, useState } from "react";
import Question from "../../../components/big-quiz/Question";
import Summary from "../../../components/big-quiz/Summary";
import Category from "../../../components/big-quiz/Category";
import Settings from "../../../components/big-quiz/Settings";
import { FaLinux } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { FaHtml5 } from "react-icons/fa";
import { SiGnubash } from "react-icons/si";
import { FaDocker } from "react-icons/fa";

const CATEGORIES = [
  { name: "linux", icon: FaLinux },
  { name: "JavaScript", icon: IoLogoJavascript },
  { name: "html", icon: FaHtml5 },
  { name: "bash", icon: SiGnubash },
  { name: "docker", icon: FaDocker },
];

export default function BigQuiz() {
  const [category, setCategory] = useState();
  const [difficulty, setDifficulty] = useState();
  const [limit, setLimit] = useState();

  function handleCategoryClick(value) {
    setCategory(value);
    console.log(value);
  }

  function handleStartClick(difficultyValue, limitValue) {
    setDifficulty(difficultyValue);
    setLimit(limitValue);
    console.log(difficultyValue);
    console.log(limitValue);
  }

  // const [questions, setQuestions] = useState();

  // useEffect(() => {
  //   async function getQuestions() {
  //     const response = await fetch(
  //       `/api/questions?limit=1&difficulty=${DIFFICULTIES.HARD}&category=linu`
  //     );
  //     setQuestions(await response.text());
  //   }
  //   getQuestions();
  // }, []);

  const categories = CATEGORIES.map(c => (
    <Category
      key={c.name}
      name={c.name}
      Icon={c.icon}
      onClick={handleCategoryClick}
    />
  ));

  return (
    <div>
      <Head>
        <title>Big Quiz</title>
        <meta
          name="description"
          content="Answer the most interesting tech questions of all time!"
        />
      </Head>

      {!category && (
        <>
          <div>
            <h1>Answer the most interesting tech questions!</h1>
          </div>
          <section>
            <h2>Categories</h2>
            <div>{categories}</div>
          </section>
        </>
      )}

      {category && !difficulty && <Settings onStartClick={handleStartClick} />}

      <Question
        number={1}
        total={limit}
        correctAnswers={[{ id: 1 }]}
        description="Time's up. Answer?"
        possibleAnswers={[
          { id: 1, text: "yes" },
          { id: 2, text: "no" },
        ]}
        hasMultipleAnswers={false}
      />

      <Summary
        category={category}
        correctAnswers={2}
        totalAnswers={limit}
        difficulty={difficulty}
      />
    </div>
  );
}
