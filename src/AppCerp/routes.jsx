import AuthGuard from "./auth/AuthGuard";
import { createBrowserRouter, redirect } from "react-router-dom";
import dashboardRoutes from "./views/dashboard/dashboardRoutes.jsx";
import sessionsRoutes from "./views/sessions/sessionsRoutes.jsx";
import Error404 from "./views/sessions/Error.jsx";

const routes = createBrowserRouter([
  {
    element: <AuthGuard />,
    children: [
      ...dashboardRoutes,
    ],
  },
  ...sessionsRoutes,
  {
    path: "/",
    exact: true,
    loader: () => redirect("/dashboard/v1"),
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

export default routes;
