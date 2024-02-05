import { GullLayouts } from "./index";
import { useSelector } from "react-redux";
import { useEffect, Suspense, Fragment } from "react";
import Customizer from "./SharedComponents/Customizer.jsx";

const GullLayout = ({ children }) => {
  const { settings } = useSelector((state) => state.layout);
  const Layout = GullLayouts[settings.activeLayout];

  useEffect(() => {
    setTimeout(() => {
      document.documentElement.setAttribute("dir", settings.dir);
    });
  }, []);

  return (
    <Suspense>
      <Fragment>
        <Layout>{children}</Layout>
        {settings.customizer.show && <Customizer />}
      </Fragment>
    </Suspense>
  );
};

export default GullLayout;
