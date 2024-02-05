import React from "react";
import { Card } from "react-bootstrap";

const SimpleCard = ({ title, children, className, subtitle }) => {
  return (
    <Card className={className}>
      <Card.Body>
        {(title || subtitle) && (
          <div className="simple-card-title">
            {title && <h3 className="text-capitalize mb-1">{title}</h3>}
            {subtitle && <h6 className="text-mutee">{subtitle}</h6>}
          </div>
        )}
        {children}
      </Card.Body>
    </Card>
  );
};

export default SimpleCard;
