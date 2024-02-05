import * as yup from "yup";
import {Formik} from "formik";
// import { Link } from "react-router-dom";
import {useState} from "react";
import SubGiroSelect from "@AppCerp/component/select/SubGiroSelect.jsx";
import TipoNegocioSelect from "@AppCerp/component/select/TipoNegocioSelect.jsx";
import {signup} from "@AppCerp/services/AuthService.js";
import SweetAlert from "sweetalert2-react";

const Signup = () => {
    const [state, setState] = useState({
        workspace: "",
        typeBusiness: "",
        lineOfBusiness: "",
        email: "",
        password: "",
    });
    const [stateResult, setStateResult] = useState({
        ok:"",
        status:"",
        msg:"",
        title:"",
    })
    const [stateMsg, setStateMsg] = useState({
        success: false,
        error: false,
    });

    const toggleAlert = (name) => {
        setStateMsg((prevState) => ({ ...prevState, [name]: !stateMsg[name] }));
    };

    const handleSubmit = async (values, {setSubmitting}) => {
        const result = await signup(values);
        setStateResult(result);
        toggleAlert(result.status);
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
                        <div
                            className="col-md-6 text-center "
                            style={{
                                backgroundSize: "cover",
                                backgroundImage: "url(/assets/images/photo-long-3.jpg)",
                            }}
                        >
                            <div className="ps-3 auth-right">
                                <div className="auth-logo text-center mt-4">
                                    <img src="/assets/images/logo.png" alt=""/>
                                </div>
                                <div className="flex-grow-1"></div>
                                <div className="w-100 mb-4">
                                    {/*<Link*/}
                                    {/*  to="/session/signin"*/}
                                    {/*  className="btn btn-rounded btn-outline-primary btn-outline-email w-100 my-1 btn-icon-text"*/}
                                    {/*>*/}
                                    {/*  <i className="i-Mail-with-At-Sign"></i> Sign in with Email*/}
                                    {/*</Link>*/}

                                    {/*<Button className="btn btn-outline-google w-100 my-1 btn-icon-text btn-rounded">*/}
                                    {/*    <i className="i-Google-Plus"></i> Sign in with Google*/}
                                    {/*</Button>*/}
                                    {/*<Button className="btn btn-outline-facebook w-100 my-1 btn-icon-text btn-rounded">*/}
                                    {/*    <i className="i-Facebook-2"></i> Sign in with Facebook*/}
                                    {/*</Button>*/}
                                </div>
                                <div className="flex-grow-1"></div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="p-4">
                                <h1 className="mb-3 text-18">Registra <small className="text-10">Tu negocio</small> </h1>
                                <Formik
                                    initialValues={state}
                                    validationSchema={SignupSchema}
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
                                                <label htmlFor="workspace">Nombre de Workspace</label>
                                                <input
                                                    className="form-control form-control-rounded"
                                                    name="workspace"
                                                    type="text"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.workspace}
                                                />
                                                {errors.workspace && touched.workspace && (
                                                    <div className="text-danger mt-1 ml-2">
                                                        {errors.workspace}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="typeBusiness">Tipo de Negocio</label>
                                                <select
                                                    className="form-control"
                                                    name="typeBusiness"
                                                    value={values.typeBusiness}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                    <TipoNegocioSelect />
                                                </select>
                                                {errors.typeBusiness && touched.typeBusiness && (
                                                    <div className="text-danger mt-1 ml-2">
                                                        {errors.typeBusiness}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="lineOfBusiness">Giro de Negocio</label>
                                                <select
                                                    className="form-control"
                                                    name="lineOfBusiness"
                                                    value={values.lineOfBusiness}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                    <SubGiroSelect />
                                                </select>
                                                {errors.lineOfBusiness && touched.lineOfBusiness && (
                                                    <div className="text-danger mt-1 ml-2">
                                                        {errors.lineOfBusiness}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input
                                                    name="email"
                                                    className="form-control form-control-rounded"
                                                    type="email"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.email}
                                                />
                                                {errors.email && touched.email && (
                                                    <div className="text-danger mt-1 ml-2">
                                                        {errors.email}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <input
                                                    name="password"
                                                    className="form-control form-control-rounded"
                                                    type="password"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password}
                                                />
                                                {errors.password && touched.password && (
                                                    <div className="text-danger mt-1 ml-2">
                                                        {errors.password}
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                className="btn btn-primary w-100 my-1 btn-rounded mt-3"
                                                type="submit"
                                            >
                                                Sign Up
                                            </button>
                                        </form>
                                    )}
                                </Formik>
                                <SweetAlert
                                    show={stateMsg.success}
                                    title={stateResult.title}
                                    type="success"
                                    text={stateResult.msg}
                                    onConfirm={() => toggleAlert("success")}/>
                                <SweetAlert
                                    show={stateMsg.error}
                                    title={stateResult.title}
                                    type="error"
                                    text={stateResult.msg}
                                    onConfirm={() => toggleAlert("error")}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SignupSchema = yup.object().shape({
    workspace: yup.string().required("El workspace es requerido"),
    typeBusiness: yup.string().required("El tipo de negocio es requerido"),
    lineOfBusiness: yup.string().required("El giro de negocio es requerido"),
    email: yup.string().email("Formato de email invalido").required("El email es requerido"),
    password: yup
        .string()
        .min(8, "La contraseña debe de tener 8 caracteres de longitus")
        .required("La contraseña es requerida")
});

export default Signup;
