import React from "react";
import { Row, Col } from "react-bootstrap";
import { useAuth } from "../../contexts/UserContext";
import ArticleCard from "../cards/ArticleCard/ArticleCard";

function Articles({ articles, onDelete }) {
  const { user, isAuthenticated } = useAuth();
  const handleDelete = (articleId) => {
    onDelete(articleId);
  };

  return (
    <Row>
      {articles.map((article, index) => (
        <Col md={4} key={index}>
          <ArticleCard
            article={article}
            onDelete={handleDelete}
            userProfile={user}
            isAuthenticated={isAuthenticated}
          />
        </Col>
      ))}
    </Row>
  );
}

export default Articles;
