import { NavLink } from "react-router";
const Navbar = () => {
  return (
    <>
      <header>
        <div className="container flex justify-between">
          <div className="logo-brand">
            <h1>RoadmapCollaborator</h1>
          </div>
          <nav>
            <ul className="flex gap-2">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
