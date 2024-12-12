import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { Home } from "../pages/Home";
import { adminRoutes } from "./admin.routes";
import { userRoutes } from "./user.routes";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import CarListing from "../pages/CarListing";
import WhoAreWE from "../components/About/WhoAreWe";
import History from "../components/About/History";
import ContactInfo from "../pages/ContactInfo";
import NotFound from "../components/NotFound";
import CarDetails from "../components/User/CarDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about/who-are-we",
        element: <WhoAreWE />,
      },
      {
        path: "/about/history",
        element: <History />,
      },
      {
        path: "/contact-info",
        element: <ContactInfo />,
      },
      {
        path: "/Car-listing",
        element: <CarListing />,
      },
      {
        path: `/Car-details/:carId`,
        element: <CarDetails />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  adminRoutes,
  userRoutes,
]);
