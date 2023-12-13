import React, { createContext, useContext, useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import useAuthHook from "../hooks/useAuthHook";
import useUserProfile from "../hooks/useUserProfile";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { isAuthenticated, getAccessToken, isLoading, user } = useAuthHook();

  return (
    <UserContext.Provider
      value={{ user, getAccessToken, isAuthenticated, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
