import { createContext, useContext, useState } from "react";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };
  let isLoggedIn = !!token;
  console.log("islogged in value, ", isLoggedIn);
  //tackling the logout fuctionality
  const logoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
