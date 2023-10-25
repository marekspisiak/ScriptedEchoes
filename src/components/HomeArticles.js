import React from "react";
import Articles from "./Articles";
import { Button } from "react-bootstrap";

function HomeArticles({ title, articles }) {
  return (
    <div className="articles-section">
      <div className="d-flex justify-content-start align-items-center mb-3">
        <h2 className="mr-2" style={{ marginRight: "20px" }}>
          {title}
        </h2>
        <Button
          variant="outline-primary"
          size="sm"
          href="/path_to_all_articles"
        >
          Zobraziť všetko
        </Button>
      </div>

      <Articles articles={articles} />
    </div>
  );
}

export default HomeArticles;
