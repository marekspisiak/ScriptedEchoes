import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import useHandleLogin from "./useHandleLogin";
import { set } from "ramda";

const useAuthHook = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated2, setIsAuthenticated2] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const handleLogin = useHandleLogin();

  const { getAccessTokenSilently, isAuthenticated, isLoading, user, logout } =
    useAuth0();
  const [loading, setLoading] = useState(isLoading);
  //nikde v aplikacii sa nesmie pouzivat cisto isLoading z auth0 lebo moze dojst k nesychronnemu rerenderu.

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    }
    if (!isLoading && !isAuthenticated) {
      setLoading(false);
    }
  }, [isLoading, isAuthenticated]);

  const getAccessToken = () => accessToken ?? handleLogin();

  const fetchAccessToken = useCallback(async () => {
    try {
      const auth0AccessToken = await getAccessTokenSilently();
      const response = await axios.get(`http://localhost:3001/auth`, {
        headers: {
          Authorization: `Bearer ${auth0AccessToken}`,
        },
      });
      setAccessToken(response.data.token);
      setUserProfile(response.data.user);
      if (!response.data.user.image) {
        setUserProfile((prev) => ({
          ...prev,
          image: "/defaultUser.jpg",
        }));
      }
    } catch (err) {
      setError(err);
    }
  }, [getAccessTokenSilently]);

  const updateProfile = async (formData) => {
    const newUsername = formData.get("username");
    if (!accessToken) {
      return;
    }

    const validUsernameRegex = /^[a-zA-Z0-9_-]+$/;

    if (!validUsernameRegex.test(newUsername)) {
      throw new Error(
        "Užívateľské meno môže obsahovať len písmená, čísla, pomlčky a podčiarkovníky, a nesmie obsahovať medzery."
      );
    }

    try {
      const response = await axios.patch(
        `http://localhost:3001/users/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUserProfile((prev) => ({
        ...prev,
        username: newUsername,
        image: response.data.imageUrl || "/defaultUser.jpg",
      }));
    } catch (err) {
      setError(err);
    }
  };

  const autentificationProcess = useCallback(async () => {
    try {
      setLoading(true);
      await fetchAccessToken();
      setIsAuthenticated2(true);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchAccessToken]);

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
    isLoading: loading,
    error,
    isAuthenticated: isAuthenticated2,
    user: userProfile,
    updateProfile,
    logout,
  };
};

export default useAuthHook;
