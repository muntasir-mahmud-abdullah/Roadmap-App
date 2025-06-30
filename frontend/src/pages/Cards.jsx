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
    <>
    <div>
      <div className="">
      <h2>Filters & Sort </h2>
      <p>Organize items by category, status, or popularity</p>        
      </div>
      <div className="">
        <div className="">
          <select id="category-filter">
            <option value="all">All Categories</option>
            <option value="Feature">Feature</option>
            <option value="bug">Bug</option> 
          </select>
        </div>
        <div className="">
          <select id="category-filter">
            <option value="all">All Statuses</option>
            <option value="Planned">Planned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="">
          <div className="btn-primary">Popular</div>
        </div>
      </div>

    </div>
      <div className="container grid grid-cols-3">
        {services.map((service) => {
          return <Card key={service._id} service={service} />;
        })}
      </div>
    </>
  );
};

export default Cards;
