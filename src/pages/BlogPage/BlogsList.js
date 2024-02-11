import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BlogHeroSection from "./BlogHeroSection";
import FilterSection from "./FilterSection";
import Articles from "../../components/Articles/Articles";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { useAuth } from "../../contexts/UserContext";
import { sort } from "ramda";

const BlogList = ({ articles, setArticles, filters }) => {
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { getAccessToken } = useAuth();

  const filterArticles = () => {
    setHasMore(true);
    handleFetchPosts(1);
  };

  useEffect(() => {
    filterArticles(filters);
  }, [filters]);

  const handleFetchPosts = async (page = currentPage) => {
    console.log(page);
    try {
      const response = await axios.get("http://localhost:3001/posts", {
        params: {
          categories: filters.selected.join(","),
          sort: filters.sortOrder,
          search: filters.search,
          page,
          limit: 9,
        },
      });

      if (response.data.posts.length > 0) {
        if (page === 1) {
          setArticles(response.data.posts);
        } else {
          setArticles((prevArticles) => [
            ...prevArticles,
            ...response.data.posts,
          ]);
        }
        setCurrentPage(page + 1);
      } else {
        setHasMore(false);
      }
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
    <InfiniteScroll
      dataLength={articles.length}
      next={() => handleFetchPosts(currentPage)}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Koniec článkov</b>
        </p>
      }
    >
      <Articles articles={articles} onDelete={deleteArticle} />
    </InfiniteScroll>
  );
};

export default BlogList;