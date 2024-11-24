import { Navigate } from "react-router-dom";
import MyProfile from "../components/MyProfile";
import Payment from "../components/Payment/Payment";
import BikeDetails from "../components/User/BikeDetails";
import MyRentalsPage from "../components/User/MyRentals";
import ProtectedDashboardLayout from "../layouts/ProtectedDashboardLayout";
import Dashboard from "../pages/Dashboard";
import BikeListing from "../components/User/BikeListing";

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
        { path: "", element: <Navigate to="bike-listing" /> },
        { path: "profile", element: <MyProfile /> },
        { path: "bike-listing", element: <BikeListing /> },
        { path: "my-rentals", element: <MyRentalsPage /> },
        { path: "bike-details/:bikeId", element: <BikeDetails /> },
        { path: "payment", element: <Payment /> },
      ],
    },
  ],
};
