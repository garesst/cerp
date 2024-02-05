import axios from "axios";
import {useEffect, useState} from "react";

const SubGiroSelect = () => {
    const [subgiros, setSubgiros] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_URL_SUBGIRO)
            .then(response => {
                setSubgiros(response.data);
            })
            .catch(error => {
                console.error('Error al obtener datos:', error);
            });
    }, []);


    return (
        <>
            <option key="" value="" disabled>Selecciona un Giro</option>
            {subgiros.map(subgiro => (
                <option key={subgiro.codsubgiro} value={subgiro.codsubgiro}>
                    {subgiro.nomsubgiro}
                </option>
            ))}
        </>

    );
}

export default SubGiroSelect;