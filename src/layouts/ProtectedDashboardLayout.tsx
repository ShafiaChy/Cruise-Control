import { ReactNode } from "react";
import {
  logout,
  TUser,
  useCurrentToken,
} from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { Navigate } from "react-router-dom";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedDashboardLayout = ({ children, role }: TProtectedRoute) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  if (!token) {
    console.log("no token");
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedDashboardLayout;
