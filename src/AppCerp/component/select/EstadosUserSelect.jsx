import {useEffect, useState} from "react";
import axios from "axios";

const EstadosUserSelect = () => {

    const [state, setState] = useState([
        {
            cod: 'ACT',
            desc: 'Activo',
        },
        {
            cod: 'VAL',
            desc: 'Pendiente de verificar',
        },
        {
            cod: 'LOC',
            desc: 'Bloqueado',
        },
        {
            cod: 'INC',
            desc: 'Inactivo'
        },
    ]);

    return (
        <>
            <option key="" value="" disabled>Selecciona un estado</option>
            {state.map(val => (
                <option key={val.cod} value={val.cod}>
                    {val.desc}
                </option>
            ))}
        </>
    );

}

export default EstadosUserSelect;