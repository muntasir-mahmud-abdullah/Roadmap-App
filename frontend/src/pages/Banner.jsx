import Lottie from "lottie-react";
import bannerImage from "../assets/banner1.png";
const Banner = () => {
  return (
    <div>
      <div className="">
        <h1>Roadmap Measures Progress and Completion</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis dolor
          aut eos placeat enim suscipit accusamus accusantium, voluptatibus
          quidem animi voluptas impedit id similique facilis! Enim consequatur
          magnam earum obcaecati.
        </p>
        <button className="btn-primary"> Get Started </button>
      </div>
      <div className="">
        <img src={bannerImage} alt="" />
      </div>
    </div>
  );
};

export default Banner;
