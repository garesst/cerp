import React from "react";
import {
  Card,
  Accordion,
  AccordionButton,
  AccordionCollapse,
  Button,
} from "react-bootstrap";
import { classList } from "@utils";
import PropTypes from "prop-types";

const RightArrowAccordion = ({ title, children, icon, eventKey }) => {
  const [openItem, setOpenItem] = React.useState(false);

  return (
    // <Card className="ul-card__border-radius">
    //   <Card.Header className="d-flex align-items-center justify-content-between">
    //     <AccordionButton
    //       as="span"
    //       eventKey={eventKey}
    //       onClick={() => setOpenItem(!openItem)}
    //       className="cursor-pointer"
    //     >
    //       <div className="card-title mb-0 text-primary">
    //         {icon && <i className={`${icon} mr-2 text-15`}></i>}
    //         {title}
    //       </div>
    //     </AccordionButton>
    //     <AccordionButton
    // as="span"
    // eventKey={eventKey}
    // onClick={() => setOpenItem(!openItem)}
    // className="cursor-pointer"
    //     >
    // <i
    //   className={classList({
    //     "text-primary text-16": true,
    //     "i-Arrow-Down": !openItem,
    //     "i-Arrow-Up": openItem,
    //   })}
    // ></i>
    //     </AccordionButton>
    //   </Card.Header>
    //   <AccordionCollapse eventKey={eventKey}>
    //     <Card.Body>{children}</Card.Body>
    //   </AccordionCollapse>
    // </Card>
    <Accordion defaultActiveKey="0" className="card">
      <Accordion.Item eventKey="0" className="border-0">
        <div className="d-flex align-items-center justify-content-between">
          <Accordion.Header
            as="span"
            eventKey={eventKey}
            onClick={() => setOpenItem(!openItem)}
            className="cursor-pointer w-50"
          >
            <div className="card-title mb-0 text-primary">
              {icon && <i className={`${icon} mr-2 text-15`}></i>}
              {title}
            </div>
          </Accordion.Header>
          <Accordion.Header
            as="span"
            eventKey={eventKey}
            onClick={() => setOpenItem(!openItem)}
            className="cursor-pointer w-50"
          >
            <div className="card-title mb-0 text-primary">
              <i
                className={classList({
                  "text-primary text-16": true,
                  "i-Arrow-Down": !openItem,
                  "i-Arrow-Up": openItem,
                })}
              ></i>
            </div>
          </Accordion.Header>
        </div>
        <Accordion.Body>{children}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

RightArrowAccordion.propTypes = {
  eventKey: PropTypes.string.isRequired,
};

export default RightArrowAccordion;
