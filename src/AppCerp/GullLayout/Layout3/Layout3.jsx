import { merge } from "lodash";
import { classList } from "@utils";
import Layout3Header from "./Layout3Header";
import Footer from "../SharedComponents/Footer";
import GullSearch from "@gull/components/GullSearch";
import { useDispatch, useSelector } from "react-redux";
import { setLayoutSettings } from "@AppCerp/redux/layout/layoutSlice";

const Layout3 = ({ children }) => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.layout);

  const handleSearchBoxClose = () => {
    dispatch(
      setLayoutSettings(
        merge({}, settings, {
          layout3Settings: {
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
      <div className="app-admin-wrap  layout-horizontal-bar">
        <Layout3Header />
        <div
          className={classList({
            "main-content-wrap d-flex flex-column": true,
          })}
        >
          <div className="main-content">{children}</div>
          <Footer />
        </div>
      </div>
      <GullSearch
        open={settings.layout3Settings.searchBox.open}
        handleClose={handleSearchBoxClose}
      />
    </div>
  );
};

export default Layout3;
