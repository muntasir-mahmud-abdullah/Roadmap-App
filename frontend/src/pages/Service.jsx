import { Navigate, Outlet } from "react-router";
import { useAuth } from "../store/Auth";
const Service = () => {
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
    <section className=" p-10 mx-auto">
      <div className="container text-center mb-10">
        <h1 className="text-3xl mb-2"> Product Roadmap </h1>
        <p>Share feedback, ideas, and vote on what we should build next.</p>
      </div>
      <Outlet />
    </section>
  );
};

export default Service;
