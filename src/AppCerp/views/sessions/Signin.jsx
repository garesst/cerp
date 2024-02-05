import * as yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
// import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loginWithEmailAndPassword } from "@AppCerp/redux/auth/authSlice";

const SigninSchema = yup.object().shape({
  email: yup.string().email("Email invalido, como tu :)").required("El email es requerido"),
  password: yup
    .string()
    .required("La contraseña es requerida"),
});

const Signin = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    event.persist();
    setState({ [event.target.name]: event.target.value });
  };

  const handleSubmit = (value, { isSubmitting }) => {
    const leto = dispatch(loginWithEmailAndPassword(value));
    console.log("leto",leto)
  };

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
            <div className="col-md-6">
              <div className="p-4">
                <div className="auth-logo text-center mb-4">
                  <img src="/assets/images/logo.png" alt="" />
                </div>
                <h1 className="mb-3 text-18">Sign In</h1>
                <Formik
                  initialValues={state}
                  validationSchema={SigninSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                          className="form-control form-control-rounded position-relative"
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        {errors.email && (
                          <div className="text-danger mt-1 ml-2">
                            {errors.email}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          className="form-control form-control-rounded"
                          type="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        {errors.password && (
                          <div className="text-danger mt-1 ml-2">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <button
                        className="btn btn-rounded btn-primary w-100 my-1 mt-2"
                        type="submit"
                      >
                        Sign In
                      </button>
                    </form>
                  )}
                </Formik>

                <div className="mt-3 text-center">
                  {/*<Link to="/session/forgot-password" className="text-muted">*/}
                  {/*  <u>Forgot Password?</u>*/}
                  {/*</Link>*/}
                </div>
              </div>
            </div>
            <div
              className="col-md-6 text-center "
              style={{
                backgroundSize: "cover",
                backgroundImage: "url(/assets/images/photo-long-3.jpg)",
              }}
            >
              <div className="pe-3 auth-right">
                {/*<Link*/}
                {/*  to="/session/signup"*/}
                {/*  className="btn btn-rounded btn-outline-primary btn-outline-email w-100 my-1 btn-icon-text"*/}
                {/*>*/}
                {/*  <i className="i-Mail-with-At-Sign"></i> Sign up with Email*/}
                {/*</Link>*/}

                <Button className="btn btn-rounded btn-outline-google w-100 my-1 btn-icon-text">
                  <i className="i-Google-Plus"></i> Sign up with Google
                </Button>
                <Button className="btn btn-rounded w-100 my-1 btn-icon-text btn-outline-facebook">
                  <i className="i-Facebook-2"></i> Sign up with Facebook
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
