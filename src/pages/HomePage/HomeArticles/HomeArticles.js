import React from "react";
import Articles from "../../../components/Articles/Articles";
import { Link } from "react-router-dom";
import Button from "../../../components/buttons/Button";

function HomeArticles({ title, articles }) {
  return (
    <div className="articles-section">
      <div className="d-flex justify-content-start align-items-center mb-3">
        <h2 className="mr-2" style={{ marginRight: "20px" }}>
          {title}
        </h2>
        <Link to="/blog">
          <Button variant="secondary">Zobraziť všetko</Button>
        </Link>
      </div>

      <Articles articles={articles} />
    </div>
  );
}

export default HomeArticles;
