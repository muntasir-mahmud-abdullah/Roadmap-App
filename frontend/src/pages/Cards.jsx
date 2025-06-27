import { Navigate } from "react-router";
import { useAuth } from "../store/Auth";
import Card from "./Card";
const Cards = () => {
  const { services, isLoading, token } = useAuth();
  if (isLoading) {
    if (!token) {
      return <Navigate to="/login" />;
    }
    return (
      <h1 className="text-2xl text-violet-400 italic m-4">Loading ... </h1>
    );
  }
  return (
    <div className="container grid grid-cols-3">
      {services.map((service) => {
        return <Card key={service._id} service={service} />;
      })}
    </div>
  );
};

export default Cards;
