import { Container, Row, Col, Form, Button } from "react-bootstrap";
import BlogHeroSection from "./BlogHeroSection";
import FilterSection from "./FilterSection";
import Articles from "../../components/Articles/Articles";
import Sidebar from "./Sidebar";
import useFetchPosts from "../../hooks/useFetchPosts";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const BlogPage = () => {
  const { posts, loading, error } = useFetchPosts(
    "http://localhost:3001/posts"
  );
  const { getAccessTokenSilently, user } = useAuth0();

  const [articles, setArticles] = useState([]);
  useEffect(() => {
    if (posts.length > 0) {
      const updatedPosts = posts.map((post) => ({
        ...post,
        description: "Popis článku...",
        image: "/holder.jpg",
      }));

      setArticles(updatedPosts);
    }
  }, [posts]);

  const deleteArticle = async (articleId) => {
    try {
      const accessToken = await getAccessTokenSilently();
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

  const testFunction = async () => {
    const accessToken = await getAccessTokenSilently();
    console.log(accessToken);
    console.log(user);
    await axios.delete(`http://localhost:3001/test`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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
            <button onClick={() => testFunction()}>test</button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BlogPage;
