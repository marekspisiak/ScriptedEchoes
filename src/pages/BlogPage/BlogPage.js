import { Container, Row, Col, Form, Button } from "react-bootstrap";
import BlogHeroSection from "./BlogHeroSection";
import FilterSection from "./FilterSection";
import Articles from "../../components/Articles/Articles";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/UserContext";

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const { getAccessToken } = useAuth();

  const filterArticles = (selected, sortOrder, search) => {
    handleFetchPosts(selected, sortOrder, search);
  };

  const handleFetchPosts = async (
    selected = [],
    sortOrder = "newest",
    search
  ) => {
    try {
      console.log(search);
      const response = await axios.get("http://localhost:3001/posts", {
        params: {
          categories: selected.join(","), // Predpokladá, že `selected` je pole ID kategórií
          sort: sortOrder,
          search,
        },
      });
      setArticles(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const deleteArticle = async (articleId) => {
    try {
      const accessToken = await getAccessToken();
      await axios.delete(`http://localhost:3001/posts/${articleId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setArticles(articles.filter((article) => article.post_id !== articleId));
    } catch (error) {
      console.error("Chyba pri odstraňovaní článku:", error);
    }
  };

  useEffect(() => {
    handleFetchPosts();
  }, []);

  return (
    <>
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
            <Articles articles={articles} onDelete={deleteArticle} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BlogPage;
