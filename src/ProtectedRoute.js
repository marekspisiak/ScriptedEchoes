import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function ProtectedRoute({ component: Component }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        authorizationParams: {
          redirect_uri: `${window.location.origin}/create`,
        },
      });
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  if (isLoading || !isAuthenticated) {
    return <div>Loading...</div>;
  }

  return <Component />;
}

export default ProtectedRoute;
