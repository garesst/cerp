import React from "react";
import { merge } from "lodash";
import { classList } from "@utils";
import ScrollBar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { setLayoutSettings } from "@AppCerp/redux/layout/layoutSlice.js";

const Customizer = () => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.layout);
  let { activeLayout } = settings;

  const sidebarColors = [
    {
      name: "gradient-purple-indigo",
    },
    {
      name: "gradient-black-blue",
    },
    {
      name: "gradient-black-gray",
    },
    {
      name: "gradient-steel-gray",
    },
    {
      name: "dark-purple",
    },
    {
      name: "slate-gray",
    },
    {
      name: "midnight-blue",
    },
    {
      name: "blue",
    },
    {
      name: "indigo",
    },
    {
      name: "pink",
    },
    {
      name: "red",
    },
    {
      name: "purple",
    },
  ];

  const handleLayoutChange = (layoutName) => {
    dispatch(
      setLayoutSettings(
        merge({}, settings, {
          activeLayout: layoutName,
        })
      )
    );
  };

  const handleCustomizerToggle = () => {
    dispatch(
      setLayoutSettings(
        merge({}, settings, {
          customizer: {
            open: !settings.customizer.open,
          },
        })
      )
    );
  };

  const handleDirectionChange = (event) => {
    let dir = settings.dir === "rtl" ? "ltr" : "rtl";
    document.documentElement.setAttribute("dir", dir);
    dispatch(
      setLayoutSettings(
        merge({}, settings, {
          dir: dir,
        })
      )
    );
  };

  const changeSidebarColor = (colorClass) => {
    dispatch(
      setLayoutSettings(
        merge({}, settings, {
          layout2Settings: {
            leftSidebar: {
              theme: colorClass,
            },
          },
        })
      )
    );
  };

  return (
    <div
      id="customizer"
      className={classList({
        customizer: true,
        open: settings.customizer.open,
      })}
    >
      <div className="handle" onClick={handleCustomizerToggle}>
        <i className="i-Gear spin"></i>
      </div>
      <ScrollBar
        className="customizer-body"
        data-perfect-scrollbar
        data-suppress-scroll-x="true"
      >
        <div className="accordion" id="accordionCustomizer">
          <div className="card">
            <div className="card-header" id="headingOne">
              <p className="mb-0">Sidebar Layout</p>
            </div>

            <div
              id="collapseOne"
              className="collapse show"
              aria-labelledby="headingThree"
              data-parent="#accordionCustomizer"
            >
              <div className="card-body layouts">
                <div
                  className={classList({
                    "layout-box": true,
                    active: activeLayout === "layout1",
                  })}
                  onClick={() => handleLayoutChange("layout1")}
                >
                  <img src="/assets/images/screenshots/04_preview.png" alt="" />
                  <i className="i-Eye"> </i>
                </div>
                <div
                  className={classList({
                    "layout-box": true,
                    active: activeLayout === "layout2",
                  })}
                  onClick={() => handleLayoutChange("layout2")}
                >
                  <img src="/assets/images/screenshots/02_preview.png" alt="" />
                  <i className="i-Eye"> </i>
                </div>
              </div>
            </div>
          </div>
          {settings.activeLayout === "layout2" && (
            <div className="card">
              <div className="card-header" id="headingOne">
                <p className="mb-0">Sidebar Colors</p>
              </div>

              <div
                id="collapseOne"
                className="collapse show"
                aria-labelledby="headingOne"
                data-parent="#accordionCustomizer"
              >
                <div className="card-body">
                  <div className="colors sidebar-colors">
                    {sidebarColors.map((c, i) => (
                      <span
                        className={`color ${c.name}`}
                        title={c.name}
                        onClick={() => changeSidebarColor(`sidebar-${c.name}`)}
                        key={i}
                      >
                        <i className="i-Eye"></i>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="card">
            <div className="card-header" id="headingOne">
              <p className="mb-0">RTL</p>
            </div>

            <div
              id="collapseTwo"
              className="collapse show"
              aria-labelledby="headingTwo"
              data-parent="#accordionCustomizer"
            >
              <div className="card-body">
                <label className="checkbox checkbox-primary">
                  <input
                    type="checkbox"
                    id="rtl-checkbox"
                    checked={settings.dir === "rtl" ? true : false}
                    onChange={handleDirectionChange}
                  />
                  <span>Enable RTL</span>
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
          </div>

          {/* <div className="card">
              <div className="card-header" id="headingThree">
                <p className="mb-0">Bootstrap Colors</p>
              </div>

              <div
                id="collapseThree"
                className="collapse show"
                aria-labelledby="headingThree"
                data-parent="#accordionCustomizer"
              >
                <div className="card-body">
                  <div className="bootstrap-colors colors">
                    <span title="lite-purple" className="color purple"></span>
                    <span title="lite-blue" className="color blue"></span>
                  </div>
                </div>
              </div>
            </div> */}
        </div>
      </ScrollBar>
    </div>
  );
};

export default Customizer;
