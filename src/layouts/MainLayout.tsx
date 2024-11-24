import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="  ">
      <div className="  w-full mx-auto">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
