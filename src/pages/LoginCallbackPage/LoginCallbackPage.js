import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/UserContext";

const LoginCallbackPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    //TODO mozno upravit aby sa to vykonavalo naozaj len po registracii
    if (isAuthenticated && !isLoading) {
      if (user?.username === "anonym") {
        navigate("/finish-signup");
      } else {
        const redirectPath = sessionStorage.getItem("lastVisitedRoute") || "/";
        navigate(redirectPath);
      }
    }
  }, [isAuthenticated, isLoading, navigate, user?.username]);

  return <></>;
};

export default LoginCallbackPage;
