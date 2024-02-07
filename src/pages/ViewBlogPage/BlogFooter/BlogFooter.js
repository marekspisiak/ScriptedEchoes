import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./BlogFooter.module.scss"; // Uistite sa, že ste vytvorili tento SCSS modul

const BlogFooter = ({ date, categories, tags }) => {
  return (
    <Row className={styles.blogFooter}>
      <Col>
        <div className={styles.date}>Published on: {date}</div>
        {categories && (
          <div className={styles.categories}>
            Categories: {categories.join(", ")}
          </div>
        )}
        {tags && <div className={styles.tags}>Tags: {tags.join(", ")}</div>}
      </Col>
    </Row>
  );
};

export default BlogFooter;
