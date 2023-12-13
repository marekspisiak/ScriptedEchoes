import { useEffect } from "react";
import { useUser } from "./contexts/UserContext";

import useHandleLogin from "./hooks/useHandleLogin";
import { Button } from "react-bootstrap";

function ProtectedRoute(props) {
  const { component: Component } = props;
  const { isAuthenticated, isLoading } = useUser();
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
