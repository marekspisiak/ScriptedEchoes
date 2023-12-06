import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function ProtectedRoute(props) {
  const { component: Component } = props;
  const { path } = props;
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        authorizationParams: {
          redirect_uri: `${window.location.origin}${path}`,
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
