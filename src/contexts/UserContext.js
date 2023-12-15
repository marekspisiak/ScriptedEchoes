import React, { createContext, useContext, useEffect, useState } from "react";

import useAuthHook from "../hooks/useAuthHook";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { isAuthenticated, getAccessToken, isLoading, user, changeUsername } =
    useAuthHook();

  return (
    <UserContext.Provider
      value={{
        user,
        getAccessToken,
        isAuthenticated,
        isLoading,
        changeUsername,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
