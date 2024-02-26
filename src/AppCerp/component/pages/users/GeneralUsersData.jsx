import {useEffect, useState} from "react";
import {Formik} from "formik";
import EstadosUserSelect from "@AppCerp/component/select/EstadosUserSelect.jsx";
import RolesSelect from "@AppCerp/component/select/RolesSelect.jsx";
import * as yup from "yup";
import {updatePassword, updateUser} from "@AppCerp/services/users/usersServices.js";
import toast, {Toaster} from "react-hot-toast";

const GeneralUsersData = ({user,isNew}) => {

    const [state, setState] = useState({
        user: {
            name: "",
            lastname: "",
            email: "",
            state: "",
            rol: "",
            codUser: "",
        },
        password: {
            newPsw: "",
            repeatPsw: "",
        },
        isNew: true,
    });

    useEffect(()=>{
        if(!isNew){
            setState({
                ...state,
                isNew,
                user: {
                    name: user.firstname || '',
                    lastname: user.lastname || '',
                    email: user.email || '',
                    state: user.state==='ACI'?'':user.state,
                    rol: user.rol.rol.codroluser,
                    codUser: user.id,

                }
            });
        }
    },[]);
    

    const handleSubmitSaveUser = async (values, {setSubmitting}) => {
        console.log(values)
        const {type,title, msg, user} = await updateUser(values);
        pushNotification(type,title,msg);
        setState({
            ...state,password: {
                newPsw: "",
                repeatPsw: "",
            }
        })
    }

    const pushNotification = (type,title,msg) => {
        switch (type){
            case 'success':
                toast.success(msg);
                break;
            case 'error':
                toast.error(msg);
                break;
        }

    }

    const handleSubmitChangePsw = async (values, {setSubmitting}) => {
        const {type,title, msg}= await updatePassword({password: values.newPsw, ideUser: state.user.codUser});
        pushNotification(type,title,msg);
    }

    return(
        <div className="row">
            <div className="col-12">
                <Formik initialValues={state.user} enableReinitialize={true} validationSchema={GeneralUserSchema} onSubmit={handleSubmitSaveUser}>
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
                            <div className="row">
                                <div className="col-md-6 form-group mb-3">
                                    <label htmlFor="firstName1">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Ingresa el nombre"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                    />
                                    {errors.name && touched.name && (
                                        <div className="text-danger mt-1 ml-2">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6 form-group mb-3">
                                    <label htmlFor="lastname">Apellido</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastname"
                                        placeholder="Ingresa el apellido"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.lastname}
                                    />
                                    {errors.lastname && touched.lastname && (
                                        <div className="text-danger mt-1 ml-2">
                                            {errors.lastname}
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6 form-group mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Ingresa el Email"
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
                                <div className="col-md-3 form-group mb-3">
                                    <label htmlFor="state">Estado</label>
                                    <select name="state" className="form-control"
                                            value={values.state}
                                            onChange={handleChange}
                                            onBlur={handleBlur}>
                                        <EstadosUserSelect on />
                                    </select>
                                    {errors.state && touched.state && (
                                        <div className="text-danger mt-1 ml-2">
                                            {errors.state}
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-3 form-group mb-3">
                                    <label htmlFor="rol">Rol</label>
                                    <select name="rol" className="form-control"
                                            value={values.rol}
                                            onChange={handleChange}
                                            onBlur={handleBlur}>
                                        <RolesSelect tenant={user.tenant}/>
                                    </select>
                                    {errors.rol && touched.rol && (
                                        <div className="text-danger mt-1 ml-2">
                                            {errors.rol}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-12 text-end">
                                <button type="submit" className="btn btn-primary">Guardar</button>
                            </div>
                        </form>
                    )}
                </Formik>

            </div>
            <div className="col-12">
                <Formik initialValues={state.password} enableReinitialize={true} validationSchema={PasswordSchema} onSubmit={handleSubmitChangePsw}>
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
                            <div className="row">
                                <div className="col-md-6 form-group mb-3">
                                    <label htmlFor="newPsw">Nueva contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="newPsw"
                                        placeholder="******"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.newPsw}
                                    />
                                    {errors.newPsw && touched.newPsw && (
                                        <div className="text-danger mt-1 ml-2">
                                            {errors.newPsw}
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6 form-group mb-3">
                                    <label htmlFor="repeatPsw">Repetir contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="repeatPsw"
                                        placeholder="*********"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.repeatPsw}
                                    />
                                    {errors.repeatPsw && touched.repeatPsw && (
                                        <div className="text-danger mt-1 ml-2">
                                            {errors.repeatPsw}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-12 text-end">
                                <button type="submit" className="btn btn-primary">Cambiar Contraseña</button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>

    );


};

const GeneralUserSchema = yup.object().shape({
    name: yup.string().required("El nombre es requerido"),
    lastname: yup.string().required("El apellido es requerido"),
    email: yup.string().email("Formato de email invalido").required("El email es requerido"),
    state: yup.string().required("El estado es requerido"),
    rol: yup.string().required("El rol es requerido"),
});

const PasswordSchema = yup.object().shape({
    newPsw: yup.string().min(8, "La contraseña debe de tener 8 caracteres de longitud")
        .required("La contraseña es requerida"),
    repeatPsw: yup.string()
        .required("Repita la contraseña")
        .oneOf([yup.ref("newPsw")], "La contraseña no coincide"),
});

export default GeneralUsersData;