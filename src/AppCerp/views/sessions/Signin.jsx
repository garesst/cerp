import { useNavigate  } from "react-router-dom";
import * as yup from "yup";
import {Formik} from "formik";
import {useEffect, useState} from "react";
// import { Link } from "react-router-dom";
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {loginWithEmailAndPassword} from "@AppCerp/redux/auth/authSlice";
import {searchTenantByUser} from "@AppCerp/services/auth/AuthService.js";
import SweetAlert from "sweetalert2-react";
import Swal from "sweetalert2";
import jwtAuthService from "@AppCerp/services/auth/jwtAuthService.js";



const Signin = () => {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        email: "",
        password: "",
        tenant: "",
    });

    const [stateMsg, setStateMsg] = useState({
        msgAlert: false,
        title: "",
        msg: "",
        type: "",
    });

    const toggleAlert = (name, title, msg, type) => {
        setStateMsg((prevState) => ({...prevState, [name]: !stateMsg[name], title, msg, type}));
    };

    const handleChange = (event) => {
        event.persist();
        setState({[event.target.name]: event.target.value});
    };

    const handlerSubmitTenant = (value, {isSubmitting}) => {
        searchTenantByUser(value.email).then(async r => {
                if (r.count === 0) {
                    toggleAlert("msgAlert", "Aviso", "El correo no esta registrado", "warning")
                }
                if (r.count === 1) {
                    setState({...state, tenant: r.tenants[0].tenant});
                }
                if (r.count > 1) {
                    const inputOptions = r.tenants.reduce((acc, option, index) => {
                        const {tenant} = option;
                        return {...acc, [index]: tenant};
                    }, {});
                    const {value} = await Swal.fire({
                        title: 'Seleccione una workspace',
                        input: 'select',
                        inputOptions,
                        inputPlaceholder: 'Seleccione',
                        showCancelButton: true,
                        cancelButtonText: 'Cancelar',
                        inputValidator: (value) => {
                            if (!value) {
                                return 'Debe seleccionar una opción';
                            }
                        },
                    });
                    if (value) {
                        setState({...state, tenant: r.tenants[value].tenant});
                    }
                }
            }
        )
    }

        const handleSubmitLogin = async (value, {isSubmitting}) => {
            const result = await jwtAuthService
              .loginWithEmailAndPassword(value.email, value.password,state.tenant);
            if(result.status==='OK'){
                dispatch(loginWithEmailAndPassword({user:result}));
                navigateTo("/dashboard/v1");
            }else{
                toggleAlert("msgAlert", "Aviso", result.msg, result.status);
            }
        };

    useEffect(() => {
        const hostname = window.location.hostname;
        const splitHostname = hostname.split('.');
        const tenant = (splitHostname.length === 1) ? "" : splitHostname[0];
        if ((splitHostname.length > 1)) {
            setState({...state, tenant})
        }
    }, [])

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
                                    <img src="/assets/images/logo.png" alt=""/>
                                </div>
                                <h1 className="mb-3 text-18 text-center ">Inicio de sesión</h1>

                                {(state.tenant === "") ?
                                    <Formik
                                        initialValues={state}
                                        validationSchema={TenantSchema}
                                        onSubmit={handlerSubmitTenant}
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
                                                <div className="form-group mb-5">
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
                                                <button
                                                    className="btn btn-rounded btn-primary w-100 my-1 mt-2"
                                                    type="submit"
                                                >
                                                    Validar
                                                </button>
                                            </form>
                                        )}
                                    </Formik>
                                    :
                                    <Formik
                                        initialValues={state}
                                        validationSchema={SigninSchema}
                                        onSubmit={handleSubmitLogin}
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
                                }
                                <SweetAlert
                                    show={stateMsg.msgAlert}
                                    title={stateMsg.title}
                                    type={stateMsg.type}
                                    text={stateMsg.msg}
                                    onConfirm={() => toggleAlert("msgAlert", "", "", "")}/>
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

const TenantSchema = yup.object().shape({
    email: yup.string().email("Email invalido, como tu :)").required("El email es requerido"),
});

const SigninSchema = yup.object().shape({
    email: yup.string().email("Email invalido, como tu :)").required("El email es requerido"),
    password: yup
        .string()
        .required("La contraseña es requerida"),
});

export default Signin;
