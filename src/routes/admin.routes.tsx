import { Navigate } from "react-router-dom";
import MyProfile from "../components/MyProfile";
import ProtectedDashboardLayout from "../layouts/ProtectedDashboardLayout";
import Dashboard from "../pages/Dashboard";

import UserManagement from "../components/Admin/UserManagement";
import CarManagement from "../components/Admin/CarManagement";
import RentalCar from "../components/Admin/ReturnCar";


export const adminRoutes = {
  path: "/admin",
  element: (
    <ProtectedDashboardLayout role="admin">
      <Dashboard />
    </ProtectedDashboardLayout>
  ),
  children: [
    {
      path: "dashboard",
      // element: <UserDashboard />,
      children: [
        { path: "", element: <Navigate to="profile" /> },
        { path: "profile", element: <MyProfile /> },
        { path: "Car-management", element: <CarManagement /> },
        { path: "user-management", element: <UserManagement /> },
        { path: "return-Car", element: <RentalCar /> },
      ],
    },
  ],
};
