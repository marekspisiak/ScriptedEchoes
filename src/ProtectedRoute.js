import { useAuth } from "./contexts/UserContext";
import PermissionDenied from "./components/PermissionDenied";

import Loading from "./components/Loading";

function ProtectedRoute(props) {
  const { component: Component } = props;
  const { isAuthenticated, isLoading } = useAuth();

  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) {
  //     return <PermissionDenied />;
  //     //handleLogin();
  //   }
  // }, [isLoading, isAuthenticated, handleLogin]);

  if (!isLoading && !isAuthenticated) {
    return <PermissionDenied />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return <Component />;
}

export default ProtectedRoute;
