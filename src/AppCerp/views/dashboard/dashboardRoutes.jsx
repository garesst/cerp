import { lazy } from "react";
import { authRoles } from "@AppCerp/auth/authRoles";

const Dashboard = lazy(() => import("./Dashboard.jsx"));

const dashboardRoutes = [
  {
    path: "/dashboard/v1",
    element: (<Dashboard />),
    auth: authRoles.admin,
  },
];

export default dashboardRoutes;
