import { useState } from "react";
const Signup = () => {
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
}
  return (
    <>
      <section>
        <div className="">
          <div className="">
            {/* image section */}
            <div className="">
              <img
                src="images/dp-removebg-preview.png"
                alt=""
                className="w-48 h-40"
              />
            </div>
          </div>
          {/* registration form section */}
          <div className="">
            <h1 className="">Registraion form</h1>
            <br />
            <form action="" onSubmit= {handleSubmit}>
              <div className="">
                <label htmlFor="email">Email</label>
                <input
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
              <div>
                <label htmlFor="password">Password</label>
                <input
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
              <button className="" type="submit">
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
