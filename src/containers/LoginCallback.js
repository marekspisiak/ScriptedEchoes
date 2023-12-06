import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const LoginCallback = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      if (user.firstLogin) {
        navigate("/finish-signup");
      } else {
        const redirectPath = sessionStorage.getItem("lastVisitedRoute") || "/";
        navigate(redirectPath);
      }
    }
  }, [user, isAuthenticated, isLoading]);

  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default LoginCallback;
