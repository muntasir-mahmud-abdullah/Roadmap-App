import { BrowserRouter, Route, Routes } from "react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Card from "./pages/Card";
import Details from "./pages/Details";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Service from "./pages/Service";
import Signup from "./pages/Signup";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/service" element={<Service />}>
            <Route index element={<Card />} />
            <Route path="viewDetails/:id" element={<Details />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};
export default App;
