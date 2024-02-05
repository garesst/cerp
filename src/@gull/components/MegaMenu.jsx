import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const MegaMenu = () => {
  return (
    <Fragment>
      <div className="row m-0">
        <div className="col-md-4 p-4 bg-img">
          <h2 className="title">
            Mega Menu <br /> Sidebar
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores
            natus laboriosam fugit, consequatur.
          </p>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Exercitationem odio amet eos dolore suscipit placeat.
          </p>
          <button className="btn btn-lg btn-rounded btn-outline-warning">
            Learn More
          </button>
        </div>
        <div className="col-md-4 p-4">
          <p className="text-primary text--cap border-bottom-primary d-inline-block">
            Features
          </p>
          <div className="menu-icon-grid w-auto p-0">
            <Link to="/">
              <i className="i-Shop-4"></i> Home
            </Link>
            <Link to="/">
              <i className="i-Library"></i> UI Kits
            </Link>
            <Link to="/">
              <i className="i-Drop"></i> Apps
            </Link>
            <Link to="/">
              <i className="i-File-Clipboard-File--Text"></i> Forms
            </Link>
            <Link to="/">
              <i className="i-Checked-User"></i> Sessions
            </Link>
            <Link to="/">
              <i className="i-Ambulance"></i> Support
            </Link>
          </div>
        </div>
        <div className="col-md-4 p-4">
          <p className="text-primary text--cap border-bottom-primary d-inline-block">
            Components
          </p>
          <ul className="links">
            <li>
              <Link to="/" href="accordion.html">
                Accordion
              </Link>
            </li>
            <li>
              <Link to="/" href="alerts.html">
                Alerts
              </Link>
            </li>
            <li>
              <Link to="/" href="buttons.html">
                Buttons
              </Link>
            </li>
            <li>
              <Link to="/" href="badges.html">
                Badges
              </Link>
            </li>
            <li>
              <Link to="/" href="carousel.html">
                Carousels
              </Link>
            </li>
            <li>
              <Link to="/" href="lists.html">
                Lists
              </Link>
            </li>
            <li>
              <Link to="/" href="popover.html">
                Popover
              </Link>
            </li>
            <li>
              <Link to="/" href="tables.html">
                Tables
              </Link>
            </li>
            <li>
              <Link to="/" href="datatables.html">
                Datatables
              </Link>
            </li>
            <li>
              <Link to="/" href="modals.html">
                Modals
              </Link>
            </li>
            <li>
              <Link to="/" href="nouislider.html">
                Sliders
              </Link>
            </li>
            <li>
              <Link to="/" href="tabs.html">
                Tabs
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default MegaMenu;
