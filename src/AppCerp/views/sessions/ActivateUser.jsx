
import {Link} from "react-router-dom";
import ActivationUser from "@AppCerp/component/pages/users/ActivationUser.jsx";


const ActivateUser = () => {

  const params = new URLSearchParams(location.search);
  const parametro = params.get('token');

  return (
    <div
      className="auth-layout-wrap"
      style={{
        backgroundImage: "url(/assets/images/photo-wide-4.jpg)",
      }}
    >
      <div className="auth-content">
        <div className="card o-hidden">
          <div className="row">
            <div className="col-md-12">
              <div className="p-4">
                <div className="auth-logo text-center mb-4">
                  <img src="/assets/images/logo.png" alt="" />
                </div>
                <h1 className="mb-12 text-18 text-center">Activación de cuentas</h1>
                <div className="p-5 text-center">
                  <ActivationUser parametro={parametro} />
                </div>
                <div className="mt-3 text-center">
                  <Link to="/session/signin" className="text-muted">
                  <u>Iniciar sesión</u>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivateUser;
