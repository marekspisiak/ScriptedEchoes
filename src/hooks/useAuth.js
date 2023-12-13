import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const useAuth = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated2, setIsAuthenticated2] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const {
    getAccessTokenSilently,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    user,
  } = useAuth0();
  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    }
    if (!isLoading && !isAuthenticated) {
      setLoading(false);
    }
  }, [isLoading, isAuthenticated]);

  const getAccessToken = async () => accessToken || fetchAccessToken();

  const handleLogin = () => {
    sessionStorage.setItem("lastVisitedRoute", window.location.pathname);
    loginWithRedirect();
  };

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/users/profile/${user?.sub}`
      );

      setUserProfile(response.data);
    } catch (err) {
      setError(err);
    }
  }, [user]);

  const fetchAccessToken = useCallback(async () => {
    try {
      const auth0AccessToken = await getAccessTokenSilently();
      const response = await axios.get(`http://localhost:3001/auth`, {
        headers: {
          Authorization: `Bearer ${auth0AccessToken}`,
        },
      });
      setAccessToken(response.data.token);
      return response.data.token;
    } catch (err) {
      setError(err);
    }
  }, [getAccessTokenSilently]);

  const autentificationProcess = useCallback(async () => {
    try {
      setLoading(true);
      await fetchAccessToken();
      await fetchUserProfile();
      setIsAuthenticated2(true);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchAccessToken, fetchUserProfile]);

  useEffect(() => {
    //ak by sa uzivatel nahodou niekde inde odhlasil pomocou funkcie logout, tak sa v auth0 isAuthenticated zmeni na false co spusti tento hook a vymazu sa jeho udaje
    if (!isAuthenticated) {
      setIsAuthenticated2(false);
      setAccessToken(null);
      return;
    }
    autentificationProcess();
  }, [isAuthenticated, autentificationProcess]);

  return {
    getAccessToken,
    loading,
    error,
    isAuthenticated: isAuthenticated2,
  };
};

export default useAuth;
