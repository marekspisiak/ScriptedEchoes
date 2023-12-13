import React, { createContext, useContext, useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import useAuth from "../hooks/useAuth";
import useUserProfile from "../hooks/useUserProfile";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { isAuthenticated, getAccessToken, loading: isLoading } = useAuth();
  const { user } = useAuth0();
  const { userProfile } = useUserProfile(user?.sub);

  return (
    <UserContext.Provider
      value={{ userProfile, getAccessToken, isAuthenticated, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
