import React from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const GullTooltip = ({ position = "bottom", children, title }) => {
  return (
    <OverlayTrigger
      key={position}
      placement={position}
      overlay={<Tooltip>{title}</Tooltip>}
    >
      {children}
    </OverlayTrigger>
  );
};

export default GullTooltip;
