import history from "@history.js";
import { createSlice } from "@reduxjs/toolkit";
import jwtAuthService from "@AppCerp/services/jwtAuthService";
import localStorageService from "../../services/localStorageService";

const initialState = {
  isAuthenticated: true,
  accessToken: undefined,
  success: false,
  loading: false,
  error: {
    username: null,
    password: null,
  },
  errorMessage: null,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const user = action.payload;
      state = { ...state, ...user };
    },

    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },

    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
    },

    resetPassword: (state, action) => {
      state.success = true;
      state.loading = false;
      console.log(action.payload.email);
    },

    requestStart: (state, action) => {
      state.loading = true;
    },

    loginWithEmailAndPassword: (state, action) => {
      const { email, password } = action.payload;
      let tuser;
       state.loading = true;

      jwtAuthService
        .loginWithEmailAndPassword(email, password)
        .then((user) => {
          // state.user = user;
          // state.accessToken = user.token;
          // state.success = true;
          // state.loading = false;
          // state = {
          //   ...state,
          //   user: user,
          //   accessToken: user.token,
          //   success: true,
          //   loading: false,
          // };

          // history.push({ pathname: "/dashboard/v1" });
          tuser={...user};
          // localStorageService.setItem("auth_user", {
          //   accessToken: user.token,
          //   user: user,
          // });
          console.log("success",user);
        })
        .catch((error) => {
          console.log("Error occurd"+error);
          // state.success = false;
          // state.loading = false;
          // state.error = error.data;
        });

      state.user = tuser;
      state.accessToken = tuser.token;
      state.success = true;
      state.loading = false;
      history.push({ pathname: "/dashboard/v1" });
      // console.log(state.loading);
    },
    logoutJWTUser: (state) => {
      console.log(state.user);
      jwtAuthService.logout();

      history.push({ pathname: "/session/signin" });

      state.user = undefined;
    },
  },
});

export const {
  setUserData,
  userLoggedIn,
  userLoggedOut,
  resetPassword,
  logoutJWTUser,
  loginWithEmailAndPassword,
} = authSlice.actions;
export default authSlice.reducer;
