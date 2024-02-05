import axios from "axios";
import {useEffect, useState} from "react";

const SubGiroSelect = () => {
    const [tipoNegocio, setTipoNegocio] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_URL_TYPEBUSINESS)
            .then(response => {
                setTipoNegocio(response.data);
            })
            .catch(error => {
                console.error('Error al obtener datos:', error);
            });
    }, []);

    return (
        <>
            <option key="" value="" disabled>Selecciona un Tipo de negocio</option>
            {tipoNegocio.map(val => (
                <option key={val.codtiponegocio} value={val.codtiponegocio}>
                    {val.nombre}
                </option>
            ))}
        </>
    );
}

export default SubGiroSelect;