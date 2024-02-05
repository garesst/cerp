import React, { Component } from "react";
import { classList } from "@utils";

class DropDownMenuItem extends Component {
  state = {
    collapsed: true
  };
  elementRef = React.createRef();

  componentHeight = 0;
  calcaulateHeight(node) {
    if (node.name !== "child") {
      for (let child of node.children) {
        this.calcaulateHeight(child);
      }
    }
    this.componentHeight += node.clientHeight;
    return;
  }
  componentDidMount() {
    this.calcaulateHeight(this.elementRef);

    // OPEN DROPDOWN IF CHILD IS ACTIVE
    // let { location } = this.props;
    // for (let child of this.elementRef.children) {
    //   if (child.getAttribute("href") === location.pathname) {
    //     this.setState({ collapsed: false });
    //   }
    // }
  }
  onItemClick = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    let { collapsed } = this.state;
    let { children } = this.props;
    let { name, icon } = this.props.item;

    return (
      <li
        className={classList({
          "nav-item dropdown-sidemenu": true,
          open: !collapsed
        })}
      >
        <div onClick={this.onItemClick}>
          <i className={`nav-icon ${icon}`}></i>
          <span className="item-name">{name}</span>
          <i className="dd-arrow i-Arrow-Down"></i>
        </div>

        <ul
          className="submenu"
          ref={el => (this.elementRef = el)}
          style={
            collapsed
              ? { maxHeight: "0px" }
              : { maxHeight: this.componentHeight + "px" }
          }
        >
          {children}
        </ul>
      </li>
    );
  }
}

export default DropDownMenuItem;
