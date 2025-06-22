import Lottie from "lottie-react";
import loginImage from "../assets/signup-image.json"
import { useState } from "react";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
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
                animationData={loginImage}
                loop={true}
              />
            </div>
          </div>
          {/* login form section */}
          <div className="w-1/2">
            <h1 className="text-4xl w-60 text-white pb-1 border-b-5 border-b-(--color-primary)">Login Form</h1>
            <br />
            <form action="" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 mb-8">
                <label className="text-xl text-white" htmlFor="email">Email</label>
                <input
                  className="border-2 max-w-80 border-[#d1d8e0] p-1 bg-(--bg-primary)"
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
                <label className="text-xl text-white" htmlFor="password">Password</label>
                <input
                  className="border-2 max-w-80 border-[#d1d8e0] p-1 bg-(--bg-primary)"
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
