import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginCallbackPage = () => {
  const [registered, setRegistered] = useState(0);
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.post(
        "http://localhost:3001/users",
        {
          auth0_id: user.sub,
          email: user.email,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Užívateľ bol vytvorený", response.data);
    } catch (error) {
      console.error("Chyba pri vytváraní užívateľa", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      if (true) {
        registerUser();

        navigate("/finish-signup");
      } else {
        const redirectPath = sessionStorage.getItem("lastVisitedRoute") || "/";
        navigate(redirectPath);
      }
    }
  }, [isAuthenticated]);

  return <></>;
};

export default LoginCallbackPage;