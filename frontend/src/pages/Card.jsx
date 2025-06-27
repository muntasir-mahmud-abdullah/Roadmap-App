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
  const [upvotes, setUpvotes] = useState(0);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  useEffect(() => {
    const cheackUpvoteStatus = async () => {
      if (token) {
        try {
          const response = await fetch(
            `${API}/api/auth/service/${_id}/upvote`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (error) {
          console.log("Error checking upvote status", error);
        }
      }
    };
    cheackUpvoteStatus();
  }, [_id]);

  const handleUpvote = async () => {
    if (!token) {
      toast("Please log in to upvote");
    }
    try {
      const response = await fetch(`${API}/api/auth/service/${_id}/upvote`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const res_data = await response.json();
      console.log(res_data)
      if (res_data.ok) {
        setUpvotes(upvotesCount + 1);
        setHasUpvoted(true);
      }
    } catch (error) {
      console.log("error upvoting", error);
    }
  };

  return (
    <motion.div
      animate={{ x: 50 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="card bg-(--bg-primary-dark) rounded-2xl border-l-6 border-l-(--color-primary) m-4 p-4 pb-16 drop-shadow-2xl flex flex-col relative"
    >
      <p className="flex justify-between">
        <span className="text-(--color-primary) font-semibold rounded-xl px-2 bg-(--color-secondary)">
          Feature
        </span>
        <span className="text-gray-300">{status}</span>
      </p>
      <h1 className="text-xl mb-3 mt-2">{title}</h1>
      <p className="border-b-(--bg-primary) pb-4 border-b-1 text-gray-300">
        {description}
      </p>
      <button
        onClick={handleUpvote}
        disabled={hasUpvoted}
        className={`cursor-pointer absolute bottom-4 flex items-center gap-2 mt-4 bg-(--bg-primary) justify-center w-16 rounded-lg ${hasUpvoted ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <BiUpvote /> {upvotes || 0}
      </button>
      <Link to={`/service/viewDetails/${_id}`}>
        <span className="absolute flex items-center justify-between bottom-4 right-4">
          View Details <MdKeyboardArrowRight />
        </span>
      </Link>
    </motion.div>
  );
};

export default Card;
