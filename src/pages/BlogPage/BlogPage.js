import { Container, Row, Col, Form, Button } from "react-bootstrap";
import BlogHeroSection from "./BlogHeroSection";
import FilterSection from "./FilterSection";
import Articles from "../../components/Articles/Articles";
import Sidebar from "./Sidebar";
import useFetchPosts from "../../hooks/useFetchPosts";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/UserContext";

const BlogPage = () => {
  const { posts, loading, error } = useFetchPosts(
    "http://localhost:3001/posts"
  );
  const { getAccessToken } = useAuth();
  const accessToken = getAccessToken();

  const [articles, setArticles] = useState([]);
  useEffect(() => {
    if (posts.length > 0) {
      const updatedPosts = posts.map((post) => ({
        ...post,
        image: "/holder.jpg",
      }));

      setArticles(updatedPosts);
    }
  }, [posts]);

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

  const sidebarData = {
    categories: [
      "Technológia",
      "Cestovanie",
      "Jedlo a pitie",
      "Umenie",
      "Osobný rast",
      "Zábava",
    ],
  };

  return (
    <>
      <Container fluid className="blog-container mt-5">
        <Row className="blog-hero-section mb-5">
          <Col>
            <BlogHeroSection />
          </Col>
        </Row>

        <Row className="content-section mb-5">
          <Col lg={3}>
            <FilterSection />
            <Sidebar categories={sidebarData.categories} />
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
