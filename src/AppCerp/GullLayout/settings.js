import layout1Settings from "./Layout1/Layout1Settings";
import layout2Settings from "./Layout2/Layout2Settings";
import layout3Settings from "./Layout3/Layout3Settings";

export const GullLayoutSettings = {
  activeLayout: "layout1", // layout1, layout2
  dir: "ltr", // ltr, rtl
  layout1Settings,
  layout2Settings,
  layout3Settings,
  customizer: {
    show: false,
    open: false
  },
  footer: {
    show: true
  }
};
