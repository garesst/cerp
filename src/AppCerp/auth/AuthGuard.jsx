
import { flat } from "@utils";
import routes from "@AppCerp/routes.jsx";
import { useSelector } from "react-redux";
import GullLayout from "@AppCerp/GullLayout/GullLayout.jsx";
import { useState, useEffect } from "react";
import {Navigate, Outlet, redirect, useLocation} from "react-router-dom";

const getUserRoleAuthStatus = (pathname, user, routes) => {

  if (!user) {
    return false;
  }
  let authByModule = false;
  const matched = routes.find((r) => r.path === pathname);
  if (matched && matched.auth && matched.auth.length && user && user.rol && user.rol.permit){
    authByModule = matched.auth.some(codmodulo => (
        user.rol.permit.some(objeto => objeto.codmodulo === codmodulo)
    ));
  }
  console.log('authByModule: ',authByModule)

  const authenticated = authByModule;

  return authenticated;
};

const AuthGuard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  console.log("esto es:",useSelector((state) => state.auth))

  const { pathname } = useLocation();
  const [previouseRoute, setPreviousRoute] = useState(null);

  const isUserRoleAuthenticated = getUserRoleAuthStatus(
    pathname,
    user,
    flat(routes.routes)
  );
  let authenticated = isAuthenticated && isUserRoleAuthenticated;
  console.log('pathname:',pathname,' authenticated: ',authenticated,' isAuthenticated: ',isAuthenticated,' isUserRoleAuthenticated: ',isUserRoleAuthenticated)

  // IF YOU NEED ROLE BASED AUTHENTICATION,
  // UNCOMMENT ABOVE TWO LINES, getUserRoleAuthStatus METHOD AND user VARIABLE
  // AND COMMENT OUT BELOW LINE

  // let authenticated = isAuthenticated

  useEffect(() => {
    if (previouseRoute !== null) setPreviousRoute(pathname);
  }, [pathname, previouseRoute]);

  return authenticated ? (
    <GullLayout>
      <Outlet />
    </GullLayout>
  ) : (
      <Navigate to="/sessions/signin" />
  );
};

export default AuthGuard;
