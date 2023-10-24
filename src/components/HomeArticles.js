import React from "react";
import { Card, Row, Col } from "react-bootstrap";

function HomeArticles({ title, articles }) {
  return (
    <div className="articles-section">
      <h2>{title}</h2>
      <Row>
        {articles.map((article, index) => (
          <Col md={4} key={index}>
            <Card className="mb-4">
              <Card.Img variant="top" src={article.image} />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.description}</Card.Text>
                <Card.Footer>
                  <small className="text-muted">{article.date}</small>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomeArticles;
