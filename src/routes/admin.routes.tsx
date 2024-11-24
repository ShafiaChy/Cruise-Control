import { Navigate } from "react-router-dom";
import MyProfile from "../components/MyProfile";
import ProtectedDashboardLayout from "../layouts/ProtectedDashboardLayout";
import Dashboard from "../pages/Dashboard";
import BikeManagement from "../components/Admin/BikeManagement";
import UserManagement from "../components/Admin/UserManagement";
import ReturnBike from "../components/Admin/ReturnBike";

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
        { path: "bike-management", element: <BikeManagement /> },
        { path: "user-management", element: <UserManagement /> },
        { path: "return-bike", element: <ReturnBike /> },
      ],
    },
  ],
};
