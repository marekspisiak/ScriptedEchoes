import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

function Articles({ articles, onDelete }) {
  const handleDelete = (articleId) => {
    // Volanie funkcie onDelete, ktorá bola poskytnutá ako prop
    onDelete(articleId);
  };

  return (
    <Row>
      {articles.map((article, index) => (
        <Col md={4} key={index}>
          <Card className="mb-4 article-card">
            <Card.Img variant="top" src={article.image} />
            <Card.Body>
              <Card.Title>{article.title}</Card.Title>
              <Card.Text>{article.description}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">{article.created_at}</small>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(article.post_id)}
                className="float-right"
              >
                Delete
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Articles;
