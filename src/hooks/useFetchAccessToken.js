import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const useFetchAccessToken = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loadingAuth0, getAccessTokenSilently, isAuthenticated } = useAuth0();

  const fetchAccessToken = async () => {
    if (!isAuthenticated) {
      return;
    }
    try {
      const auth0AccessToken = await getAccessTokenSilently();
      const response = await axios.get(`http://localhost:3001/auth`, {
        headers: {
          Authorization: `Bearer ${auth0AccessToken}`,
        },
      });
      setAccessToken(response.data.token);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccessToken();
  }, [loadingAuth0, isAuthenticated]);

  return { accessToken, loading, error };
};

export default useFetchAccessToken;
