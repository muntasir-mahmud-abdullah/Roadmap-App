import { motion } from "motion/react";
import { BiUpvote } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, Navigate } from "react-router";
import { useAuth } from "../store/Auth";
const Card = () => {
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
        return (
          <motion.div
            animate={{ x: 50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="card bg-(--bg-primary-dark) rounded-2xl border-l-6 border-l-(--color-primary) m-4 p-4 pb-16 drop-shadow-2xl flex flex-col relative"
            key={service._id}
          >
            <p className="flex justify-between">
              <span className="text-(--color-primary) font-semibold rounded-xl px-2 bg-(--color-secondary)">
                Feature
              </span>
              <span className="text-gray-300">{service.status}</span>
            </p>
            <h1 className="text-xl mb-3 mt-2">{service.title}</h1>
            <p className="border-b-(--bg-primary) pb-4 border-b-1 text-gray-300">
              {service.description}
            </p>
            <button className="cursor-pointer absolute bottom-4 flex items-center gap-2 mt-4 bg-(--bg-primary) justify-center w-16 rounded-lg">
              <BiUpvote /> {service.upvotesCount}
            </button>
            <Link to={`/service/viewDetails/${service._id}`}>
              <span className="absolute flex items-center justify-between bottom-4 right-4">
                View Details <MdKeyboardArrowRight />
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Card;
