import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./BlogHeader.module.scss"; // Uistite sa, že ste vytvorili tento SCSS modul

const BlogHeader = ({ title, author }) => {
  return (
    <Row className={styles.blogHeader}>
      <Col>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.author}>Vytvoril {author}</p>
      </Col>
    </Row>
  );
};

export default BlogHeader;
