import { useAuth0 } from "@auth0/auth0-react";

function ProtectedRoute(props) {
  const { component } = props;

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    loginWithRedirect();
  }

  return <>{isAuthenticated ? component : null}</>;
}

export default ProtectedRoute;
