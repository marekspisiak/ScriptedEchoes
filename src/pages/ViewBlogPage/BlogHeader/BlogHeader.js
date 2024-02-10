import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./BlogHeader.module.scss"; // Uistite sa, že ste vytvorili tento SCSS modul

const BlogHeader = ({ title, author, image, description }) => {
  return (
    <Row className={styles.blogHeader}>
      <Col md={8}>
        {" "}
        {/* Alebo iná veľkosť podľa vašich potrieb */}
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.author}>Vytvoril {author}</p>
      </Col>
      {image && (
        <Col md={4} className={styles.imageCol}>
          {" "}
          {/* Prispôsobte triedy podľa potreby */}
          <img src={image} alt="Blog" className={styles.blogImage} />{" "}
          {/* Uistite sa, že máte definované štýly */}
        </Col>
      )}
    </Row>
  );
};

export default BlogHeader;
