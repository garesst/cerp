import { useState } from "react";
import { classList } from "@utils";
import { NavLink } from "react-router-dom";
import DropDownMenuItem from "./DropDownMenuItem";

const DropDownMenu = (props) => {
  const { closeSecSidenav, menu } = props;
  const [state, setState] = useState({
    open: false,
  });

  const onItemClick = (e) => {
    e.preventDefault();
    setState({ open: !state.open });
  };

  const renderLevels = (items) =>
    items.map((item, i) => {
      if (item.sub) {
        return (
          <DropDownMenuItem key={i} item={item}>
            {renderLevels(item.sub)}
          </DropDownMenuItem>
        );
      } else {
        return (
          <li
            key={i}
            className={classList({
              "nav-item": true,
              open: state.open,
            })}
            onClick={closeSecSidenav}
          >
            <NavLink
              exact
              to={item.path}
              className={({ isActive }) => (isActive ? "selected" : undefined)}
            >
              <i className={`nav-icon ${item.icon}`}></i>
              <span className="item-name">{item.name}</span>
            </NavLink>
          </li>
        );
      }
    });

  return <ul className="childNav">{renderLevels(menu)}</ul>;
};

export default DropDownMenu;
