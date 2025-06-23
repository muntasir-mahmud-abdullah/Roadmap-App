import { NavLink } from "react-router";
import { useAuth } from "../store/Auth";
import "./Navbar.css";
const Navbar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <header className="w-full py-2 px-4 bg-(--bg-primary) sticky top-0 z-50">
        <div className="container flex justify-between mx-auto">
          <div className="">
            <h1>RoadmapCollaborator</h1>
          </div>
          <nav>
            <ul className="flex gap-4">
              <li>
                <NavLink className="navlink" to="/">
                  Home
                </NavLink>
              </li>
              {isLoggedIn ? (
                <li>
                  <NavLink className="navlink" to="/logout">
                    Log Out
                  </NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink className="navlink" to="/signup">
                      Sign Up
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="navlink" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
