import { merge } from "lodash";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { navigations } from "@AppCerp/navigations";
import ScrollBar from "react-perfect-scrollbar";
import MegaMenu from "@gull/components/MegaMenu";
import { getTimeDifference, classList } from "@utils";
import { useDispatch, useSelector } from "react-redux";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { logoutJWTUser } from "@AppCerp/redux/auth/authSlice";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import { setLayoutSettings } from "@AppCerp/redux/layout/layoutSlice";

const Layout3Header = () => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.layout);

  const state = {
    shorcutMenuList: [
      {
        icon: "i-Shop-4",
        link: "#",
        text: "Home",
      },
      {
        icon: "i-Library",
        link: "#",
        text: "Ui Kits",
      },
      {
        icon: "i-Drop",
        link: "#",
        text: "Apps",
      },
      {
        icon: "i-File-Clipboard-File--Text",
        link: "#",
        text: "Form",
      },
      {
        icon: "i-Checked-User",
        link: "#",
        text: "Sessions",
      },
      {
        icon: "i-Ambulance",
        link: "#",
        text: "Support",
      },
    ],
    notificationList: [
      {
        icon: "i-Speach-Bubble-6",
        title: "New message",
        description: "James: Hey! are you busy?",
        time: "2019-10-30T02:10:18.931Z",
        color: "primary",
        status: "New",
      },
      {
        icon: "i-Receipt-3",
        title: "New order received",
        description: "1 Headphone, 3 iPhone",
        time: "2019-03-10T02:10:18.931Z",
        color: "success",
        status: "New",
      },
      {
        icon: "i-Empty-Box",
        title: "Product out of stock",
        description: "1 Headphone, 3 iPhone",
        time: "2019-05-10T02:10:18.931Z",
        color: "danger",
        status: "3",
      },
      {
        icon: "i-Data-Power",
        title: "Server up!",
        description: "Server rebooted successfully",
        time: "2019-03-10T02:10:18.931Z",
        color: "success",
        status: "3",
      },
    ],
  };

  const handleMenuClick = () => {
    dispatch(
      setLayoutSettings(
        merge({}, settings, {
          layout3Settings: {
            leftSidebar: {
              open: !settings.layout3Settings.leftSidebar.open,
            },
          },
        })
      )
    );
  };

  const toggleFullScreen = () => {
    if (document.fullscreenEnabled) {
      if (!document.fullscreen) document.documentElement.requestFullscreen();
      else document.exitFullscreen();
    }
  };

  const handleSearchBoxOpen = () => {
    dispatch(
      setLayoutSettings(
        merge({}, settings, {
          layout3Settings: {
            searchBox: {
              open: true,
            },
          },
        })
      )
    );
  };

  let { shorcutMenuList = [], notificationList = [] } = state;

  return (
    <Fragment>
      <div className="main-header">
        <div className="logo">
          <img src="/assets/images/logo.png" alt="" />
        </div>

        <div className="menu-toggle" onClick={handleMenuClick}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="d-none d-lg-flex align-items-center">
          <Dropdown className="mr-3">
            <Dropdown.Toggle variant="link" id="dropdown-basic">
              Mega Menugdf
            </Dropdown.Toggle>

            <div className="mega-menu">
              <Dropdown.Menu>
                <MegaMenu></MegaMenu>
              </Dropdown.Menu>
            </div>
          </Dropdown>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search"
              onFocus={handleSearchBoxOpen}
            />
            <i className="search-icon text-muted i-Magnifi-Glass1"></i>
          </div>
        </div>

        <div style={{ margin: "auto" }}></div>

        <div className="header-part-right">
          <i
            className="i-Full-Screen header-icon d-none d-sm-inline-block"
            data-fullscreen
            onClick={toggleFullScreen}
          ></i>

          <Dropdown>
            <Dropdown.Toggle variant="link" className="toggle-hidden">
              <i
                className="i-Safe-Box text-muted header-icon"
                role="button"
              ></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <div className="menu-icon-grid">
                {shorcutMenuList.map((menu) => (
                  <Link key={menu.text} to={menu.link}>
                    <i className={menu.icon}></i> {menu.text}
                  </Link>
                ))}
              </div>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="link" className="toggle-hidden">
              <div
                className="badge-top-container"
                role="button"
                id="dropdownNotification"
                data-toggle="dropdown"
              >
                <span className="badge badge-primary">3</span>
                <i className="i-Bell text-muted header-icon"></i>
              </div>
            </Dropdown.Toggle>

            <DropdownMenu className="notification-dropdown rtl-ps-none">
              {notificationList.map((note, index) => (
                <div key={index} className="dropdown-item d-flex">
                  <div className="notification-icon">
                    <i className={`${note.icon} text-${note.color} mr-1`}></i>
                  </div>
                  <div className="notification-details flex-grow-1">
                    <p className="m-0 d-flex align-items-center">
                      <span>{note.title}</span>
                      <span
                        className={`badge badge-pill badge-${note.color} ml-1 mr-1`}
                      >
                        {note.status}
                      </span>
                      <span className="flex-grow-1"></span>
                      <span className="text-small text-muted ml-auto">
                        {getTimeDifference(new Date(note.time))} ago
                      </span>
                    </p>
                    <p className="text-small text-muted m-0">
                      {note.description}
                    </p>
                  </div>
                </div>
              ))}
            </DropdownMenu>
          </Dropdown>

          <div className="user col align-self-end">
            <Dropdown>
              <DropdownToggle variant="link" className="toggle-hidden">
                <img
                  src="/assets/images/faces/1.jpg"
                  id="userDropdown"
                  alt=""
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                />
              </DropdownToggle>
              <DropdownMenu>
                <div className="dropdown-header">
                  <i className="i-Lock-User mr-1"></i> Timothy Carlson
                </div>
                <span className="dropdown-item cursor-pointer">
                  Account settings
                </span>
                <span className="dropdown-item cursor-pointer">
                  Billing history
                </span>
                <span
                  className="dropdown-item cursor-pointer"
                  // onClick={() => dispatch(logoutJWTUser())}
                >
                  Sign out
                </span>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>

      <div className="horizontal-bar-wrap">
        <div
          className={classList({
            "header-topnav": true,
            open: settings.layout3Settings.leftSidebar.open,
          })}
        >
          <div className="container-fluid">
            <ScrollBar className="topnav position-relative rtl-ps-none">
              <ul className="menu float-left">
                {navigations.map((parent, index) => (
                  <li key={index}>
                    <div>
                      <div>
                        <label className="toggle" htmlFor={`drop-${index}`}>
                          {parent.name}
                        </label>
                        <Link to={!parent.sub ? parent.path : "#"}>
                          <i className={`nav-icon mr-2 ${parent.icon}`}></i>
                          {parent.name}
                        </Link>
                        <input type="checkbox" id={`drop-${index}`} />
                        <ul>
                          {parent.sub &&
                            parent.sub.map((child, i) => (
                              <li key={i}>
                                <Link to={child.path || "#"}>
                                  <i
                                    className={`nav-icon mr-2 ${child.icon}`}
                                  ></i>
                                  <span className="item-name">
                                    {child.name}
                                  </span>
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollBar>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Layout3Header;
