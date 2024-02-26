import { lazy } from "react";
import { authRoles } from "@AppCerp/auth/authRoles";

const Profile = lazy(() => import("./Profile.jsx"));

const dashboardRoutes = [
  {
    path: "/profile",
    element: (<Profile />),
    auth: authRoles.usrProfile,
  },
];

export default dashboardRoutes;
