import {useEffect, useRef, useState} from "react";
import {activateUserTenant} from "@AppCerp/services/auth/AuthService.js";

const ActivationUser = ({parametro}) => {

    const [statusActivation, setStatusActivation] = useState(-1);
    const hasMounted = useRef(false);

    useEffect(()=>{
        if (!hasMounted.current) {
            if (!(parametro === null || parametro === '')){
                hasMounted.current = true;
                const fetchData = async () => {
                    try {
                        const codigo = await activateUserTenant(parametro);
                        setStatusActivation(codigo);
                    } catch (error) {
                        // console.error('Error al activar usuario y tenant:', error);
                        alert('Error al activar usuario y tenant');
                    }
                };
                fetchData();
            }
        }

    },[])

    return(
        <>
            {
                (statusActivation===-1) ?
                    <span className="spinner-glow spinner-glow-dark me-5"></span>
                    :(statusActivation===1)?
                        <h3>Tu cuenta ha sido activada</h3>
                        :
                        <h3>Proceso de activacion no se pudo realizar</h3>
            }
        </>
    )

}

export default ActivationUser;