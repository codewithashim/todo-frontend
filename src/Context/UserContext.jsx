/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();
import jwtDecode from "jwt-decode";

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        setUser(decodedToken);
      } else {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  const userInfo = {
    user,
    logOut
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
