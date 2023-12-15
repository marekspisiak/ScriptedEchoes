import { useEffect } from "react";
import { useAuth } from "./contexts/UserContext";

import useHandleLogin from "./hooks/useHandleLogin";

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
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  return <Component />;
}

export default ProtectedRoute;
