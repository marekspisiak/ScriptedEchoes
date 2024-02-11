import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BlogHeroSection from "./BlogHeroSection";
import FilterSection from "./FilterSection";
import BlogList from "./BlogsList";

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({
    selected: [],
    sortOrder: "newest",
    search: "",
  });

  const filterArticles = (selected, sortOrder, search) => {
    setFilters({ selected, sortOrder, search });
  };

  return (
    <Container fluid className="blog-container mt-5">
      <Row className="blog-hero-section mb-5">
        <Col>
          <BlogHeroSection />
        </Col>
      </Row>

      <Row className="content-section mb-5">
        <Col lg={3} className="mb-5">
          <FilterSection filterArticles={filterArticles} />
        </Col>

        <Col lg={9}>
          <BlogList
            articles={articles}
            setArticles={setArticles}
            filters={filters}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default BlogPage;
