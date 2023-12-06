import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import useHandleLogin from "./hooks/useHandleLogin";

function ProtectedRoute(props) {
  const { component: Component } = props;
  const { isAuthenticated, isLoading } = useAuth0();
  const handleLogin = useHandleLogin();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      handleLogin();
    }
  }, []);

  if (isLoading || !isAuthenticated) {
    return <div>Loading...</div>;
  }

  return <Component />;
}

export default ProtectedRoute;
