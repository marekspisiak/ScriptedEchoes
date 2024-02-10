import { Container, Row, Col, Form, Button } from "react-bootstrap";
import BlogHeroSection from "./BlogHeroSection";
import FilterSection from "./FilterSection";
import Articles from "../../components/Articles/Articles";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/UserContext";

const BlogPage = () => {
  const { getAccessToken } = useAuth();
  const accessToken = getAccessToken();

  const [articles, setArticles] = useState([]);

  const handleFetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/posts");
      setArticles(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const deleteArticle = async (articleId) => {
    try {
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
            <FilterSection />
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
