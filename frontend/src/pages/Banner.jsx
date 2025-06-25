import { motion } from "motion/react";
import { useNavigate } from "react-router";
import bannerImage from "../assets/banner1-removebg-preview.png";
import officeImage from "../assets/digital-marketing-4229637_1920.jpg";
const Banner = () => {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate("/login");
  };
  return (
    <div className="flex gap-2 px-24 pb-20 pt-12 justify-between">
      <div className="flex flex-col w-1/2 justify-center">
        <h1 className="text-3xl mb-8">
          Roadmap Measures Progress and Completion
        </h1>
        <p className="mb-4">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis dolor
          aut eos placeat enim suscipit accusamus accusantium, voluptatibus
          quidem animi voluptas impedit id similique facilis! Enim consequatur
          magnam earum obcaecati.
        </p>
        <button onClick={handleStart} className="btn-primary w-36">
          {" "}
          Get Started{" "}
        </button>
      </div>
      <div className="w-1/2 relative">
        <motion.img
          animate={{ x: [0, 50, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="ml-auto border-2 border-cyan-500 rounded-t-4xl w-11/12"
          src={bannerImage}
          alt="banner image"
        />
        <motion.img
          animate={{ y: [0, 20, 0],x: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="border-2 mr-auto border-yellow-200 rounded-t-4xl w-2/3 absolute -bottom-1 left-auto"
          src={officeImage}
          alt="office image"
        />
      </div>
    </div>
  );
};

export default Banner;
