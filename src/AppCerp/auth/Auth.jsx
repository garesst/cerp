import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/auth/authSlice";
import jwtAuthService from "../services/auth/jwtAuthService";
import localStorageService from "../services/localStorageService";

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const checkJwtAuth = async () => {
    jwtAuthService.loginWithToken().then((user) => {
      dispatch(setUserData(user));
    }).catch();
  };

  useEffect(() => {
    checkJwtAuth();
  }, []);

  return <>{children}</>;
};

export default Auth;
