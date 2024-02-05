import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./redux/api/apiSlice";
import authSliceReducer from "./redux/auth/authSlice";
import layoutSliceReducer from "./redux/layout/layoutSlice";
// import loginSliceReducer from "./redux/login/authSlice";
// import ecommerceSliceReducer from "./redux/ecommerce/ecommerceSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    layout: layoutSliceReducer,
    // login: loginSliceReducer,
    // ecommerce: ecommerceSliceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
