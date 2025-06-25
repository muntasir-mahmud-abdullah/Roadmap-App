import Lottie from "lottie-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import registerImage from "../assets/register-image.json";
import { useAuth } from "../store/Auth";
const Signup = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { storeTokenInLS, API } = useAuth();
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
      const response = await fetch(`${API}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        // Credential: true,
      });

      const res_data = await response.json();
      console.log("res from server", res_data);
      console.log(response);
      if (response.ok) {
        // stored the token in local storage
        storeTokenInLS(res_data.token);
        setUser({
          email: "",
          password: "",
        });
        toast.success("Registration Successful");
        navigate("/service");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.log("register", error);
    }
  };
  return (
    <>
      <section className="p-24">
        <div className="container flex justify-between mx-auto">
          {/* image section */}
          <div className="w-1/2 flex items-center justify-start">
            <div className="">
              <Lottie
                className="w-96"
                animationData={registerImage}
                loop={true}
              />
            </div>
          </div>
          {/* registration form section */}
          <div className="w-1/2">
            <h1 className="text-4xl w-80 text-white pb-1 border-b-5 border-b-(--color-primary)">
              Registration Form
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
                Register Now
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
