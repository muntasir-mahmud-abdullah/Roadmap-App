import { useEffect } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../store/Auth";
const Logout = () => {
  const { logoutUser } = useAuth();
  useEffect(() => {
    logoutUser();
  }, [logoutUser]);
  return <Navigate to="/login" />;
};

export default Logout;
