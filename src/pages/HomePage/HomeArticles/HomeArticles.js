import React from "react";
import Articles from "../../../components/Articles/Articles";
import { Link } from "react-router-dom";
import Button from "../../../components/buttons/Button";
import styles from "./HomeArticles.module.scss";

function HomeArticles({ title, articles }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <Link to="/blog">
          <Button variant="secondary">Zobraziť všetko</Button>
        </Link>
      </div>

      <Articles articles={articles} />
    </div>
  );
}

export default HomeArticles;
