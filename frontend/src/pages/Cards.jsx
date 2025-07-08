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

  if (isLoading) {
    if (!token) {
      return <Navigate to="/login" />;
    }
    return (
              <div className="flex justify-center p-10">
                <div className="animate-spin rounded-full size-24 border-t-6 border-primary"></div>
              </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Filters & Sort Section */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Filters & Sort
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Organize items by category, status, or popularity
        </p>
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 text-black focus:ring-indigo-500"
            >
              <option value="All">All</option>
              <option value="Feature">Feature</option>
              <option value="Bug">Bug</option>
              <option value="Enhancement">Enhancement</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 text-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Planned">Planned</option>
            </select>
          </div>
          <button
            onClick={() => setSort(!sort)}
            className={`mt-auto  text-white px-5 py-2 rounded-lg shadow btn-primary transition-opacity disabled:opacity-50 disabled:cursor-not-allowed ${
              sort ? "opacity-50" : ""
            }`}
            disabled={sort}
          >
            Popular
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
