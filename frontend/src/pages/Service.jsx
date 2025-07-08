import { Navigate, Outlet } from "react-router";
import { useAuth } from "../store/Auth";
const Service = () => {
  const { services, isLoading, token } = useAuth();

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
    <section className=" px-40 py-10">
      <div className="container flex flex-col items-center mb-10">
        <h1 className="text-3xl mb-2"> Product Roadmap </h1>
        <p>Share feedback, ideas, and vote on what we should build next.</p>
      </div>
      <Outlet />
    </section>
  );
};

export default Service;
