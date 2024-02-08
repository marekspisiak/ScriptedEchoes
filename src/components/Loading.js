import React from "react";
import styles from "./Loading.module.scss"; // Predpokladáme, že tu máte definované CSS moduly

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loading;
