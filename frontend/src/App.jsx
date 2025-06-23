import {BrowserRouter,Routes,Route} from "react-router";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Error from "./pages/Error";
import Logout from "./pages/Logout";
import Service from "./pages/Service";
const App = () => {
  return <>
  <BrowserRouter>
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/service" element={<Service />} />
        <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>
  </>
}
export default App;