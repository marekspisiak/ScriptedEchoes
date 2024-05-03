import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./BlogHeader.module.scss"; // Uistite sa, že ste vytvorili tento SCSS modul

const BlogHeader = ({ title, author, image, description }) => {
  return (
    <Row className={styles.blogHeader}>
      <Col md={8}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>{" "}
        <p className={styles.author}>Vytvoril {author}</p>
      </Col>
      {image && (
        <Col md={4} className={styles.imageCol}>
          <img src={image} alt="Blog" className={styles.blogImage} />
        </Col>
      )}
    </Row>
  );
};

export default BlogHeader;
