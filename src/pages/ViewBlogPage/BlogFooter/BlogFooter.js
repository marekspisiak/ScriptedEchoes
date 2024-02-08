import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./BlogFooter.module.scss"; // Uistite sa, že ste vytvorili tento SCSS modul
import { formatFullDate } from "../../../modules/formatDate";

const BlogFooter = ({ creationDate, updateDate, categories, tags }) => {
  return (
    <Row className={styles.blogFooter}>
      <Col>
        <div className={styles.date}>
          Vytvorené: {formatFullDate(creationDate)}
        </div>
        {updateDate && creationDate !== updateDate && (
          <div className={styles.date}>
            Aktualizované: {formatFullDate(updateDate)}
          </div>
        )}
        {categories && (
          <div className={styles.categories}>
            Kategórie: {categories.join(", ")}
          </div>
        )}
        {tags && <div className={styles.tags}>Tagy: {tags.join(", ")}</div>}
      </Col>
    </Row>
  );
};

export default BlogFooter;
