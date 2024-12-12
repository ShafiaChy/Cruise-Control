import { Navigate } from "react-router-dom";
import MyProfile from "../components/MyProfile";
import Payment from "../components/Payment/Payment";

import MyRentalsPage from "../components/User/MyRentals";
import ProtectedDashboardLayout from "../layouts/ProtectedDashboardLayout";
import Dashboard from "../pages/Dashboard";

import Testimonial from "../components/User/Testimonial";
import CarDetails from "../components/User/CarDetails";
import CarListing from "../pages/CarListing";

export const userRoutes = {
  path: "/user",
  element: (
    <ProtectedDashboardLayout role="user">
      <Dashboard />
    </ProtectedDashboardLayout>
  ),
  children: [
    {
      path: "dashboard",
      // element: <UserDashboard />,
      children: [
        { path: "", element: <Navigate to="Car-listing" /> },
        { path: "profile", element: <MyProfile /> },
        { path: "Car-listing", element: <CarListing /> },
        { path: "reviews", element: <Testimonial /> },
        { path: "my-rentals", element: <MyRentalsPage /> },
        { path: "Car-details/:carId", element: <CarDetails /> },
        { path: "payment", element: <Payment /> },
      ],
    },
  ],
};
