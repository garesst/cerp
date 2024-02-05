import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const Breadcrumb = ({ routeSegments }) => {
  return (
    <Fragment>
      <div className="breadcrumb">
        {routeSegments ? (
          <Fragment>
            <h1>{routeSegments[routeSegments.length - 1]["name"]}</h1>
          </Fragment>
        ) : null}
        <ul>
          {routeSegments
            ? routeSegments.map((route, index) =>
                index !== routeSegments.length - 1 ? (
                  <li key={index}>
                    <NavLink to={route.path}>
                      <span className="capitalize text-muted">
                        {route.name}
                      </span>
                    </NavLink>
                  </li>
                ) : (
                  <li key={index}>
                    <span className="capitalize text-muted">{route.name}</span>
                  </li>
                )
              )
            : null}
        </ul>
      </div>
      <div className="separator-breadcrumb border-top"></div>
    </Fragment>
  );
};

export default Breadcrumb;
