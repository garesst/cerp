import { useForm } from 'react-hook-form';

const RegisterForm = ({changeState}) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);

    return(
        <>
            <div className="card">
                <div className="card-body">
                    <h2>Registro de negocio</h2>
                    <p className="text-muted fs-4">
                        Ingrese los datos solicitados para comenzar co su registro
                    </p>
                    <form className="form-horizontal mt-1 pt-1 needs-validation" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control form-input-bg"
                                   placeholder="Nombre de Workspace" {...register("tenant", {
                                required: true,
                                maxLength: 50
                            })} />
                            <label htmlFor="tb-rfname">Nombre de Workspace</label>
                            <div className="invalid-feedback">workspace is required</div>
                        </div>
                        <div className="form-floating mb-3">
                            <select id="typeBussines"
                                    className="form-select" {...register("typeBussiness", {required: true})}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <label htmlFor="typeBussines">Tipo de Negocio</label>
                            <div className="invalid-feedback">typeBussiness is required</div>
                        </div>
                        <div className="form-floating mb-3">
                            <select id="giroBussines"
                                    className="form-select" {...register("giroBussiness", {required: true})}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <label htmlFor="giroBussines">Giro de Negocio</label>
                            <div className="invalid-feedback">typeBussiness is required</div>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control form-input-bg"
                                   placeholder="Correo electronico" {...register("emailBussiness", {required: true})} />
                            <label htmlFor="tb-rfname">Email</label>
                            <div className="invalid-feedback">email is required</div>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control form-input-bg"
                                   placeholder="password" {...register("password", {})} />
                            <label htmlFor="tb-rfname">Contraseña</label>
                            <div className="invalid-feedback">password is required</div>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                            <div className="form-check">
                                <input type="checkbox" id="r-me" className="form-check-input"
                                       placeholder="terminos" {...register("terminos", {required: true})} />
                                <label className="form-check-label" htmlFor="r-me1">
                                    Aceptar Terminos
                                </label>
                            </div>
                        </div>


                        <input type="submit" value="Registrar"/>
                        <a style={{color: '#2cabe3',cursor: 'pointer'}} onClick={()=> changeState('login')} id="to-login" className="btn btn-lg btn-light-secondarytext-secondary font-weight-medium">Cancelar</a>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterForm;