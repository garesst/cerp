import { merge } from "lodash";
import { Suspense } from "react";
import { classList } from "@utils";
import Layout2Header from "./Layout2Header";
import Layout2Sidenav from "./Layout2Sidenav";
import Footer from "../SharedComponents/Footer";
import GullSearch from "@gull/components/GullSearch";
import { useDispatch, useSelector } from "react-redux";
import { setLayoutSettings } from "@AppCerp/redux/layout/layoutSlice";
import Loading from "@gull/components/GullLoadable/Loading.jsx";

const Layout2 = ({ children }) => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.layout);

  const handleSearchBoxClose = () => {
    dispatch(
      setLayoutSettings(
        merge({}, settings, {
          layout2Settings: {
            searchBox: {
              open: false,
            },
          },
        })
      )
    );
  };

  return (
    <div>
      <div
        className={`${classList({
          "app-admin-wrap layout-sidebar-compact clearfix": true,
          "sidenav-open": settings.layout2Settings.leftSidebar.open,
        })} ${settings.layout2Settings.leftSidebar.theme}`}
      >
        <Layout2Sidenav />
        {/* sidebar */}

        <div
          className={classList({
            "main-content-wrap d-flex flex-column": true,
            "sidenav-open": settings.layout2Settings.leftSidebar.open,
          })}
        >
          {settings.layout2Settings.header.show && <Layout2Header />}
          <Suspense fallback={<Loading />}>
            <div className="main-content">{children}</div>
          </Suspense>
          <Footer />
        </div>
      </div>
      <GullSearch
        open={settings.layout2Settings.searchBox.open}
        handleClose={handleSearchBoxClose}
      />
    </div>
  );
};

export default Layout2;
