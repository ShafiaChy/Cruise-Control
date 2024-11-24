import { NavLink, Outlet } from "react-router-dom";
import {
  FaUser,
  FaMotorcycle,
  FaCalendarCheck,
  FaUsers,
  FaToolbox,
} from "react-icons/fa";
import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useAppSelector } from "../redux/hooks";

const userMenuItems = [
  { name: "Profile", path: "profile", icon: <FaUser className="w-6 h-6" /> },
  {
    name: "Bike Listing",
    path: "bike-listing",
    icon: <FaMotorcycle className="w-6 h-6" />,
  },
  {
    name: "My Rentals",
    path: "my-rentals",
    icon: <FaCalendarCheck className="w-6 h-6" />,
  },
];

const adminMenuItems = [
  { name: "Profile", path: "profile", icon: <FaUser className="w-6 h-6" /> },
  {
    name: "Bike Management",
    path: "bike-management",
    icon: <FaMotorcycle className="w-6 h-6" />,
  },
  {
    name: "User Management",
    path: "user-management",
    icon: <FaUsers className="w-6 h-6" />,
  },
  {
    name: "Return Bike",
    path: "return-bike",
    icon: <FaToolbox className="w-6 h-6" />,
  },
];

const Dashboard = () => {
  const userRole = useAppSelector((state) => state.auth.user?.role);

  const menuItems = userRole === "admin" ? adminMenuItems : userMenuItems;

  return (
    <>
      <Navbar />
      <section className="relative mt-24 max-w-screen bg-black/10 mx-4 md:mx-12">
        <nav className="z-20 absolute top-0 left-0 right-0 flex flex-row md:flex-col w-full md:w-24 md:h-96 md:top-20 justify-around items-center gap-8 py-4 shadow-lg backdrop-blur-lg ps-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={`dashboard/${item.path}`}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  isActive
                    ? "text-custom-green border-transparent"
                    : "text-gray-400 hover:text-custom-green border-transparent"
                } border-b-2`
              }
            >
              {item.icon}
              <small className="text-center text-xs md:text-sm font-medium">
                {item.name}
              </small>
            </NavLink>
          ))}
        </nav>

        <main className="pt-28 lg:pt-6 py-8 md:p-4 md:ms-28 min-h-screen ">
          <Outlet />
        </main>
      </section>

      <Footer />
    </>
  );
};

export default Dashboard;
