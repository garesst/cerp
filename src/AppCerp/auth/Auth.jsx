import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/auth/authSlice";
import jwtAuthService from "../services/jwtAuthService";
import localStorageService from "../services/localStorageService";

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  // const checkJwtAuth = () => {
  //   jwtAuthService.loginWithToken().then((user) => {
  //     dispatch(setUserData(user));
  //   });
  // };

  useEffect(() => {
    dispatch(setUserData(localStorageService.getItem("auth_user")));
    // checkJwtAuth();
  }, []);

  return <>{children}</>;
};

export default Auth;
