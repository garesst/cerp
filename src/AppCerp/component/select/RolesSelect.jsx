import axios from "axios";
import {useEffect, useState} from "react";
import {getRolesByTenant} from "@AppCerp/services/tenant/CatalogsServices.js";

const RolesSelect = ({tenant}) => {
    const [state, setState] = useState([]);

    useEffect(() => {
        getRolesByTenant(tenant).then((response)=>{
            setState(response);
        });
    }, []);

    return (
        <>
            <option key="" value="" disabled>Selecciona un Rol</option>
            {state.map(val => (
                <option key={val.codrol} value={val.codrol}>
                    {val.nomrol}
                </option>
            ))}
        </>
    );
}

export default RolesSelect;