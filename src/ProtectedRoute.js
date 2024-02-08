import { useEffect } from "react";
import { useAuth } from "./contexts/UserContext";

import useHandleLogin from "./hooks/useHandleLogin";
import Loading from "./components/Loading";

function ProtectedRoute(props) {
  const { component: Component } = props;
  const { isAuthenticated, isLoading } = useAuth();
  const handleLogin = useHandleLogin();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      handleLogin();
    }
  }, [isLoading, isAuthenticated, handleLogin]);

  if (isLoading || !isAuthenticated) {
    return <Loading />;
  }

  return <Component />;
}

export default ProtectedRoute;
