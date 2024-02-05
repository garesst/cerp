import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { navigations } from "../../navigations";
import { merge } from "lodash";
import { classList } from "@utils";
import Srcollbar from "react-perfect-scrollbar";
import { DropDownMenu } from "@gull";

import { useDispatch, useSelector } from "react-redux";
import { setLayoutSettings } from "@AppCerp/redux/layout/layoutSlice";

const Layout2Sidenav = () => {
  let windowListener = null;
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.layout);
  const state = {
    selectedItem: {
      name: "Dashboard",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      type: "dropDown",
      icon: "i-Bar-Chart",
      sub: [
        {
          icon: "i-Clock-3",
          name: "Version 1",
          path: "/dashboard/v1",
          type: "link",
        },
        {
          icon: "i-Clock-4",
          name: "Version 2",
          path: "/dashboard/v2",
          type: "link",
        },
        {
          icon: "i-Over-Time",
          name: "Version 3",
          path: "/dashboard/v3",
          type: "link",
        },
        {
          icon: "i-Clock",
          name: "Version 4",
          path: "/dashboard/v4",
          type: "link",
        },
      ],
    },
    navOpen: true,
    secondaryNavOpen: false,
  };

  const onMainItemMouseEnter = (item) => {
    setSelected(item);
  };

  const onMainItemMouseLeave = () => {};

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

  const closeSecNav = () => {
    dispatch(
      setLayoutSettings(
        merge({}, settings, {
          layout2Settings: {
            leftSidebar: {
              open: false,
              secondaryNavOpen: false,
            },
          },
        })
      )
    );
  };

  const openSecNav = () => {
    dispatch(
      setLayoutSettings(
        merge({}, settings, {
          layout2Settings: {
            leftSidebar: {
              open: true,
              secondaryNavOpen: true,
            },
          },
        })
      )
    );
  };

  useEffect(() => {
    setTimeout(() => {
      findSelectedItem();
    });
    if (window) {
      if (window.innerWidth < 1200) {
        closeSecNav();
      } else {
        openSecNav();
      }
    }

    windowListener = window.addEventListener("resize", () => {
      if (window.innerWidth < 1200) {
        closeSecNav();
      } else {
        openSecNav();
      }
    });
  }, []);

  useEffect(() => {
    if (windowListener) {
      window.removeEventListener("resize", windowListener);
    }
  }, [windowListener]);

  let { selectedItem } = state;

  return (
    <div className="side-content-wrap">
      <Srcollbar
        className={classList({
          "sidebar-left rtl-ps-none": true,
          open: settings.layout2Settings.leftSidebar.open,
        })}
      >
        <ul className="navigation-left">
          {navigations.map((item, i) => (
            <li
              className={classList({
                "nav-item": true,
                active: item.name === selectedItem.name,
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

      <div
        className={classList({
          "sidebar-left-secondary rtl-ps-none": true,
          open: settings.layout2Settings.leftSidebar.secondaryNavOpen,
        })}
      >
        <i className="sidebar-close i-Close" onClick={closeSecNav}></i>
        <div className="logo ml-4 mb-4">
          <img src="/assets/images/logo-text.png" alt="logo" />
        </div>
        <div className="header mb-3 ml-4">
          <h5 className="font-weight-bold mb-1">{selectedItem.name}</h5>
          <p>{selectedItem.description}</p>
        </div>
        {selectedItem && selectedItem.sub && (
          <DropDownMenu menu={selectedItem.sub}></DropDownMenu>
        )}
      </div>
      <div
        className={classList({
          "sidebar-overlay": true,
          open: settings.layout2Settings.leftSidebar.secondaryNavOpen,
        })}
      ></div>
    </div>
  );
};

export default Layout2Sidenav;
