import React, { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);

  const saveUserProfile = (id) => {
    setUserProfile(id);
  };

  return (
    <UserContext.Provider value={{ userProfile, saveUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
