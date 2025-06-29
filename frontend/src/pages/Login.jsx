import Lottie from "lottie-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import loginImage from "../assets/signup-image.json";
import { useAuth } from "../store/Auth";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { storeTokenInLS,storeUserIdInLS, API } = useAuth();
  // handling the input values
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        // Credential: true,
      });
      const res_data = await response.json();
      console.log(res_data);
      if (response.ok) {
        storeTokenInLS(res_data.token);
        storeUserIdInLS(res_data.userId);
        toast.success("Login Successful");
        setUser({
          email: "",
          password: "",
        });
        navigate("/service");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.log("login", error);
    }
  };
  return (
    <>
      <section className="p-24">
        <div className="container flex justify-between mx-auto">
          {/* image section */}
          <div className="w-1/2 flex items-center justify-start">
            <div className="">
              <Lottie className="w-96" animationData={loginImage} loop={true} />
            </div>
          </div>
          {/* login form section */}
          <div className="w-1/2">
            <h1 className="text-4xl w-60 text-white pb-1 border-b-5 border-b-(--color-primary)">
              Login Form
            </h1>
            <br />
            <form action="" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 mb-8">
                <label className="text-lg text-white" htmlFor="email">
                  Email
                </label>
                <input
                  className="border-2 text-white focus:bg-(--bg-primary-dark) max-w-80 border-[#d1d8e0] p-1 bg-(--bg-primary)"
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  id=""
                  required
                  autoComplete="off"
                  value={user.email}
                  onChange={handleInput}
                />
              </div>
              <div className="flex flex-col gap-2 mb-8">
                <label className="text-lg text-white" htmlFor="password">
                  Password
                </label>
                <input
                  className="border-2 text-white focus:bg-(--bg-primary-dark) max-w-80 border-[#d1d8e0] p-1 bg-(--bg-primary)"
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  id=""
                  required
                  autoComplete="off"
                  value={user.password}
                  onChange={handleInput}
                />
              </div>
              <br />
              <button className="btn-primary" type="submit">
                Login Now
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
