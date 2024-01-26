import { useForm } from 'react-hook-form';

const LoginForm = ({changeState}) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);

    return(
        <>
            <div className="card">
                <div className="card-body">
                    <h2>Bienvenido a Cerp.io</h2>
                    <p className="text-muted fs-4">
                        No posees cuenta?
                        <a style={{color: '#2cabe3',cursor: 'pointer'}} onClick={()=> changeState('register')}>Crea una cuenta aqui!</a>
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)} className='form-horizontal mt-1 pt-1 needs-validation'>
                        <div className="form-floating mb-3">
                            <input type="email" placeholder="name@example.com"
                                   className="form-control form-input-bg" {...register("email", {required: true})} />
                            <label htmlFor="tb-email">Email</label>
                            <div className="invalid-feedback">Email is required</div>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control form-input-bg"
                                   placeholder="*****" {...register("password", {required: true})} />
                            <label htmlFor="text-password">Password</label>
                            <div className="invalid-feedback">Password is required</div>
                        </div>
                        <input type="submit" className="btn btn-info btn-lg px-4" value="Entrar" />
                    </form>
                </div>
            </div>
        </>


)
    ;
};

export default LoginForm;