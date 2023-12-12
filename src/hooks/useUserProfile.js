import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const useUserProfile = (userId) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/profile/${userId}`
        );

        const accessToken = await getAccessTokenSilently();
        const authResponse = await axios.get(`http://localhost:3001/auth`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserProfile({ ...response.data, ...authResponse.data });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  return { userProfile, loading, error };
};

export default useUserProfile;
