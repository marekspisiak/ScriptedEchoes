import { useState, useEffect } from "react";
import axios from "axios";

const useFetchPosts = (url) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(url);
        setPosts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [url]);

  return { posts, loading, error };
};

export default useFetchPosts;
