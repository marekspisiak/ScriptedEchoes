import React from "react";
import styles from "./PermissionDenied.module.scss"; // Predpokladajme, že tu máte definované CSS moduly

const PermissionDenied = () => {
  return (
    <div className={styles.permissionDenied}>
      <h2>Prístup zamietnutý</h2>
      <p>
        Ľutujeme, ale nemáte dostatočné oprávnenia na prístup k tejto stránke
        alebo vykonanie tejto akcie.
      </p>
    </div>
  );
};

export default PermissionDenied;
