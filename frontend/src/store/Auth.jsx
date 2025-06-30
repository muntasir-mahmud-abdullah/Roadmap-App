import { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const API = import.meta.env.VITE_APP_URI_API;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  const storeUserIdInLS = (userId) => {
    setUserId(userId);
    return localStorage.setItem("userId", userId);
  };
  let isLoggedIn = !!token;
  console.log("islogged in value, ", isLoggedIn);
  console.log("token value, ", token);
  console.log("userId, ", userId);

  //tackling the logout fuctionality
  const logoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  // jwt authentication = to get currently logged in user data

  const getUsers = async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      console.log("Token in state:", token);
      const response = await fetch(`${API}/api/auth/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
        setIsLoading(false);
      } else {
        console.error("failed fetching user data");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error fetching user data");
    }
  };
  // fetch services data from database
  const getServices = async () => {
    try {
      const response = await fetch(`${API}/api/auth/service`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setServices(data.msg);
      }
    } catch (error) {
      console.log("services frontend error:", error);
    }
  };
  useEffect(() => {
    getServices();
    getUsers();
  }, [token]);
  // console.log(users)
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        storeUserIdInLS,
        logoutUser,
        services,
        isLoading,
        API,
        token,
        users,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
