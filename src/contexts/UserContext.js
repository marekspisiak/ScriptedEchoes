import React, { createContext, useContext, useEffect, useState } from "react";

import useAuthHook from "../hooks/useAuthHook";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { isAuthenticated, getAccessToken, isLoading, user, updateProfile } =
    useAuthHook();

  return (
    <UserContext.Provider
      value={{
        user,
        getAccessToken,
        isAuthenticated,
        isLoading,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
