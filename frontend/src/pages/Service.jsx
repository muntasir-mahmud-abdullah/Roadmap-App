import { Navigate } from "react-router";
import { useAuth } from "../store/Auth";
const Service = () => {
  const { services, user, isLoading, token } = useAuth();
  console.log(user);

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
      <div className="container grid grid-cols-3">
        {services.map((service) => {
          return (
            <div className="card rounded-2xl border-l-4 border-l-indigo-500 border-2 m-4 p-4" key={service._id}>
              <p className="flex justify-between">
              <span>Feature</span>
              <span className="">{service.status}</span>
              </p>
              <h1 className="text-xl mb-2">{service.title}</h1>
              <p>{service.description}</p>
              <p>Category: {service.category}</p>
              <p>Upvotes: {service.upvotesCount}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Service;
