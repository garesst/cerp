import { merge } from "lodash";
import { DropDownMenu } from "@gull";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { classList, isMobile } from "@utils";
import { navigations } from "../../navigations";
import Srcollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { setLayoutSettings } from "@AppCerp/redux/layout/layoutSlice";
import { useLocation } from "react-router-dom";

const Layout2Sidenav = () => {
  let windowListener = null;
  const location = useLocation();
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.layout);

  const [state, setState] = useState({
    selectedItem: {},
    navOpen: true,
    secondaryNavOpen: false,
  });
  let { selectedItem } = state;

  const onMainItemMouseEnter = (item) => {
    setSelected(item);
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

  const onMainItemMouseLeave = () => {};

  const setSelected = (selectedItem) => {
    setState({ selectedItem });
  };

  const removeSelected = () => {
    setState({ selectedItem: null });
  };

  const closeSecNav = () => {
    let other = {};

    if (isMobile()) {
      other.open = false;
    }

    dispatch(
      setLayoutSettings(
        merge({}, settings, {
          layout2Settings: {
            leftSidebar: {
              ...other,
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

  return (
    <div className="side-content-wrap">
      <Srcollbar
        className={classList({
          "sidebar-left o-hidden rtl-ps-none": true,
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

      <Srcollbar
        className={classList({
          "sidebar-left-secondary o-hidden rtl-ps-none": true,
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
          <DropDownMenu
            menu={selectedItem.sub}
            closeSecSidenav={closeSecNav}
          ></DropDownMenu>
        )}
      </Srcollbar>
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
