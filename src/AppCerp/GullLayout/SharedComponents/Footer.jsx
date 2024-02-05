import { Fragment } from "react";

const Footer = () => {
  return (
    <Fragment>
      <div className="flex-grow-1"></div>
      <div className="app-footer">
        <div className="row">
          <div className="col-md-9">
            <p>
              <strong>CERP sistema de gestion</strong>
            </p>
            <p>
              Gestiona como nunca antes...
            </p>
            <p>
              Adminsitra de forma eficaz tus negocios con un sistema hecho a la medida de tu negocio para lograr tus metas
            </p>
          </div>
        </div>
        <div className="footer-bottom border-top pt-3 d-flex flex-column flex-sm-row align-items-center">
          <a
            id="buy-gull"
            className="btn btn-primary text-white btn-rounded"
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Compra CERP
          </a>
          <span className="flex-grow-1"></span>
          <div className="d-flex align-items-center">
            <img className="logo" src="/assets/images/logo.png" alt="" />
            <div>
              <p className="m-0">&copy; 2014 CERP</p>
              <p className="m-0">All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
