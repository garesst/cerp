import { lazy } from "react";

const Layout1 = lazy(() => import("./Layout1/Layout1"));
const Layout2 = lazy(() => import("./Layout2/Layout2"));
const Layout3 = lazy(() => import("./Layout3/Layout3"));

export const GullLayouts = {
  layout1: Layout1,
  layout2: Layout2,
  layout3: Layout3
};
