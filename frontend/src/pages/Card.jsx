import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { BiUpvote } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../store/Auth";

const Card = ({ service }) => {
  const { API, token } = useAuth();
  const { _id, title, description, category, status, upvotesCount } = service;
  const [upvotes, setUpvotes] = useState(upvotesCount);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  useEffect(() => {
    const checkUpvoteStatus = async () => {
      if (token) {
        try {
          const res = await fetch(
            `${API}/api/auth/service/${_id}/upvote`,
            {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const data = await res.json();
          setHasUpvoted(data.hasUpvoted);
        } catch (err) {
          console.error(err);
        }
      }
    };
    checkUpvoteStatus();
  }, [_id, API, token]);

  const handleUpvote = async () => {
    if (!token) {
      return toast("Please log in to upvote");
    }
    try {
      const res = await fetch(
        `${API}/api/auth/service/${_id}/upvote`,
        { method: "POST", headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        setUpvotes((prev) => prev + 1);
        setHasUpvoted(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between relative"
    >
      <div>
        <p className="flex justify-between items-center mb-4">
          <span className="text-primary font-semibold bg-blue-100 px-2 py-1 rounded-lg">
            {category}
          </span>
          <span className="text-gray-500 text-sm">{status}</span>
        </p>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-6">{description}</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handleUpvote}
          disabled={hasUpvoted}
          className="flex items-center space-x-2 btn-primary text-white px-4 py-2 rounded-lg shadow  disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <BiUpvote />
          <span>{upvotes}</span>
        </button>
        <Link to={`/service/viewDetails/${_id}`} className="flex items-center text-primary hover:underline">
          View Details <MdKeyboardArrowRight className="ml-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default Card;
