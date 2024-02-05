import React from "react";
import { Badge } from "react-bootstrap";

const OutlinedBadge = ({ title }) => {
  return (
    <Badge pill className="badge-outline-primary p-2">
      {title}
    </Badge>
  );
};

export default OutlinedBadge;
