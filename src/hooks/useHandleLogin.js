import { useAuth0 } from "@auth0/auth0-react";

const useHandleLogin = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    sessionStorage.setItem("lastVisitedRoute", window.location.pathname);
    loginWithRedirect();
  };

  return handleLogin;
};

export default useHandleLogin;
