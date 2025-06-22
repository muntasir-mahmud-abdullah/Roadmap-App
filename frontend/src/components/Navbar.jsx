import { NavLink } from "react-router";
import "./Navbar.css";
const Navbar = () => {
  return (
    <>
      <header className="w-full py-2 px-4 bg-(--bg-primary) sticky top-0 z-50">
        <div className="container flex justify-between mx-auto">
          <div className="logo-brand">
            <h1>RoadmapCollaborator</h1>
          </div>
          <nav>
            <ul className="flex gap-4">
              <li>
                <NavLink className="navlink" to="/">Home</NavLink>
              </li>
              <li>
                <NavLink className="navlink" to="/signup">Sign Up</NavLink>
              </li>
              <li>
                <NavLink className="navlink" to="/login">Login</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
