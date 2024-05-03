import React from "react";
import { Container } from "react-bootstrap";
import styles from "./BlogContent.module.scss"; // Uistite sa, že ste vytvorili tento SCSS modul

const BlogContent = ({ content }) => {
  return (
    <Container className={styles.blogContent}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Container>
  );
};

export default BlogContent;
