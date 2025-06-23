import { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };
  let isLoggedIn = !!token;
  console.log("islogged in value, ", isLoggedIn);
  console.log("token value, ", token);
  //tackling the logout fuctionality
  const logoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  // jwt authentication = to get currently logged in user data
    const userAuthentication = async () => {
      if(!token) return;
      try {
        console.log("Token in state:", token);
        const response = await fetch("http://localhost:5000/api/auth/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.userData);
          console.log(data.userData);
        }
        else{
          console.error("failed fetching user data")
        }
      } catch (error) {
        console.log("error fetching user data");
      }
    };

    useEffect(()=>{
      userAuthentication();
    },[token])

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, storeTokenInLS, logoutUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
