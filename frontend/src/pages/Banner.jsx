import Lottie from "lottie-react";
import bannerImage from "../assets/banner1.png";
const Banner = () => {
  return (
    <div className="flex py-10 px-24 justify-between">
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl mb-8">Roadmap Measures Progress and Completion</h1>
        <p className="mb-4">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis dolor
          aut eos placeat enim suscipit accusamus accusantium, voluptatibus
          quidem animi voluptas impedit id similique facilis! Enim consequatur
          magnam earum obcaecati.
        </p>
        <button className="btn-primary w-36"> Get Started </button>
      </div>
      <div className="">
        <img className="w-2/3 ml-auto rounded-3xl" src={bannerImage} alt="" />
      </div>
    </div>
  );
};

export default Banner;
