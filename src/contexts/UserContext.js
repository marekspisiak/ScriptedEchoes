import React, { createContext, useContext, useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import useFetchAccessToken from "../hooks/useFetchAccessToken";
import useUserProfile from "../hooks/useUserProfile";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { accessToken, error, loading } = useFetchAccessToken();
  const { user } = useAuth0();
  const { userProfile } = useUserProfile(user?.sub);

  return (
    <UserContext.Provider value={{ userProfile, accessToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
