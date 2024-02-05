import { createSlice } from "@reduxjs/toolkit";
import { GullLayoutSettings } from "../../GullLayout/settings";

const initialState = {
  settings: {
    ...GullLayoutSettings,
  },
  defaultSettings: {
    ...GullLayoutSettings,
  },
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setLayoutSettings: (state, action) => {
      state.settings = action.payload;
    },
    setDefaultSettings: (state, action) => {
      state.defaultSettings = action.payload;
    },
  },
});

export const { setLayoutSettings, setDefaultSettings } = layoutSlice.actions;
export default layoutSlice.reducer;
