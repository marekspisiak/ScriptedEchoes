import { useAuth } from "../contexts/UserContext";

const usePermission = ({ requiredPermissions = [], requiredUserId }) => {
  const { user, isAuthenticated } = useAuth();

  const hasPermission =
    isAuthenticated &&
    (user?.permissions.includes("everything") ||
      requiredPermissions.some((permission) =>
        user?.permissions.includes(permission)
      ));

  const isAuthorizedUser = !requiredUserId || user?.user_id === requiredUserId;

  return hasPermission || isAuthorizedUser;
};

export default usePermission;
