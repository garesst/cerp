import { merge } from "lodash";
import { DropDownMenu } from "@gull";
import { classList, isMobile } from "@utils";
import Srcollbar from "react-perfect-scrollbar";
import { navigations } from "../../navigations";
import ScrollBar from "react-perfect-scrollbar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { setLayoutSettings } from "@AppCerp/redux/layout/layoutSlice";

const Layout1Sidenav = () => {
  let windowListener = null;
  const location = useLocation();
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.layout);

  const [state, setState] = useState({
    selectedItem: null,
    navOpen: true,
    secondaryNavOpen: false,
  });

  const onMainItemMouseLeave = () => {
    // closeSecSidenav();
  };

  const setSelected = (selectedItem) => {
    setState({ selectedItem });
  };

  const removeSelected = () => {
    setState({ selectedItem: null });
  };

  const findSelectedItem = () => {
    navigations.forEach((item) => {
      if (item.sub) {
        item.sub.forEach((child) => {
          if (child.sub) {
            child.sub.forEach((grandChild) => {
              if (grandChild.path === location.pathname) {
                setSelected(item);
              }
            });
          } else {
            if (child.path === location.pathname) {
              setSelected(item);
            }
          }
        });
      } else {
        if (item.path === location.pathname) {
          setSelected(item);
        }
      }
    });
  };

  const openSecSidenav = () => {
    dispatch(
      setLayoutSettings(
        merge({}, settings, {
          layout1Settings: {
            leftSidebar: {
              secondaryNavOpen: true,
            },
          },
        })
      )
    );
  };

  const closeSecSidenav = () => {
    let other = {};

    if (isMobile()) {
      other.open = false;
    }

    dispatch(
      setLayoutSettings(
        merge({}, settings, {
          layout1Settings: {
            leftSidebar: {
              ...other,
              secondaryNavOpen: false,
            },
          },
        })
      )
    );
  };

  const closeSidenav = () => {
    dispatch(
      setLayoutSettings(
        merge({}, settings, {
          layout1Settings: {
            leftSidebar: {
              open: false,
              secondaryNavOpen: false,
            },
          },
        })
      )
    );
  };

  const openSidenav = () => {
    dispatch(
      setLayoutSettings(
        merge({}, settings, {
          layout1Settings: {
            leftSidebar: {
              open: true,
            },
          },
        })
      )
    );
  };

  const onMainItemMouseEnter = (item) => {
    if (item.type === "dropDown") {
      setSelected(item);
      openSecSidenav();
    } else {
      setSelected(item);
      closeSecSidenav();
    }
  };

  useEffect(() => {
    // if (state.selectedItem === null) closeSecSidenav();
    setTimeout(() => {
      findSelectedItem();
    });

    if (window) {
      if (window.innerWidth < 1200) {
        closeSidenav();
      } else {
        openSidenav();
      }
    }

    windowListener = window.addEventListener("resize", ({ target }) => {
      if (window.innerWidth < 1200) {
        closeSidenav();
      } else {
        openSidenav();
      }
    });
  }, []);

  useEffect(() => {
    if (windowListener) {
      window.removeEventListener("resize", windowListener);
    }
  }, [windowListener]);

  return (
    <div className="side-content-wrap">
      <Srcollbar
        className={classList({
          "sidebar-left o-hidden rtl-ps-none": true,
          open: settings.layout1Settings.leftSidebar.open,
        })}
        // id="mainsidenav"
      >
        <ul className="navigation-left">
          {navigations.map((item, i) => (
            <li
              className={classList({
                "nav-item": true,
                active: state.selectedItem === item,
              })}
              onMouseEnter={() => {
                onMainItemMouseEnter(item);
              }}
              onMouseLeave={onMainItemMouseLeave}
              key={i}
            >
              {item.path && item.type !== "extLink" && (
                <NavLink className="nav-item-hold" to={item.path}>
                  <i className={`nav-icon ${item.icon}`}></i>
                  <span className="nav-text">{item.name}</span>
                </NavLink>
              )}
              {item.path && item.type === "extLink" && (
                <a className="nav-item-hold" href={item.path}>
                  <i className={`nav-icon ${item.icon}`}></i>
                  <span className="nav-text">{item.name}</span>
                </a>
              )}
              {!item.path && (
                <div className="nav-item-hold">
                  <i className={`nav-icon ${item.icon}`}></i>
                  <span className="nav-text">{item.name}</span>
                </div>
              )}
              <div className="triangle"></div>
            </li>
          ))}
        </ul>
      </Srcollbar>

      <ScrollBar
        className={classList({
          "sidebar-left-secondary o-hidden rtl-ps-none": true,
          open: settings.layout1Settings.leftSidebar.secondaryNavOpen,
        })}
      >
        {state.selectedItem && state.selectedItem.sub && (
          <DropDownMenu
            menu={state.selectedItem.sub}
            closeSecSidenav={closeSecSidenav}
          ></DropDownMenu>
        )}
        <span></span>
      </ScrollBar>
      <div
        onMouseEnter={closeSecSidenav}
        className={classList({
          "sidebar-overlay": true,
          open: settings.layout1Settings.leftSidebar.secondaryNavOpen,
        })}
      ></div>
    </div>
  );
};

export default Layout1Sidenav;
