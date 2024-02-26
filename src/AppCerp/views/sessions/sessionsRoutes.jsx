import { lazy, Suspense } from "react";

const Signup = lazy(() => import("./Signup"));
const Signin = lazy(() => import("./Signin"));
const ForgotPassword = lazy(() => import("./ForgotPassword"));
const Error404 = lazy(() => import("./Error"));
const ActivateUser = lazy(() => import("./ActivateUser.jsx"))

const sessionsRoutes = [
  {
    path: "/sessions/signup",
    element: (
      <Suspense>
        <Signup />
      </Suspense>
    ),
  },
  {
    path: "/sessions/signin",
    element: (
      <Suspense>
        <Signin />
      </Suspense>
    ),
  },
  {
    path: "/sessions/activation",
    element: (
        <Suspense>
          <ActivateUser />
        </Suspense>
    ),
  },
  {
    path: "/sessions/forgot-password",
    element: (
      <Suspense>
        <ForgotPassword />
      </Suspense>
    ),
  },
  {
    path: "/sessions/404",
    element: (
      <Suspense>
        <Error404 />
      </Suspense>
    ),
  },
];

export default sessionsRoutes;
