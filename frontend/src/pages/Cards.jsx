import { Navigate } from "react-router";
import { useAuth } from "../store/Auth";
import Card from "./Card";
const Cards = () => {
  const {
    services,
    isLoading,
    token,
    category,
    setCategory,
    status,
    setStatus,
    sort,
    setSort,
  } = useAuth();
  console.log(sort);
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
            <label>Filter by Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All"> All </option>
              <option value="Feature">Feature </option>
              <option value="Bug">Bug </option>
              <option value="Enhancement">Enhancement </option>
            </select>
          </div>
          <div className="">
            <label>Filter by Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="All"> All </option>
              <option value="In Progress"> In Progress </option>
              <option value="Completed"> Completed </option>
              <option value="Planned"> Planned </option>
            </select>
          </div>
          <div className="">
            <button
              onClick={()=> setSort(true)}
              className={`btn-primary ${sort && "opacity-50"}`}
            >
              Popular
            </button>
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
