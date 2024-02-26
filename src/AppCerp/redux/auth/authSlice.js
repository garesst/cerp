import { createSlice } from "@reduxjs/toolkit";
import jwtAuthService from "@AppCerp/services/auth/jwtAuthService";
import localStorageService from "../../services/localStorageService";

const initialState = {
  isAuthenticated: false,
  accessToken: undefined,
  success: false,
  loading: true,
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
      state.accessToken = action.payload.token;
      state.user = action.payload.user;
      state.success = action.payload.success;
      state.isAuthenticated= action.payload.isAuthenticated;
      state.loading= action.payload.loading;
      // state = { ...state, ...user ,isAuthenticated:true,accessToken:user.id, success:true,};
    },

    setUser: (state, action) => {
      state.user = action.payload.user;
      // state = { ...state, ...user ,isAuthenticated:true,accessToken:user.id, success:true,};
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
      state.accessToken = action.payload.user.user.token;
      state.user = action.payload.user.user;
      state.success = true;
      state.isAuthenticated= true;
      state.loading= false;
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
  setUser,
  userLoggedIn,
  userLoggedOut,
  resetPassword,
  logoutJWTUser,
  loginWithEmailAndPassword,
} = authSlice.actions;
export default authSlice.reducer;
