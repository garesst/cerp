import axiosConfig from "@AppCerp/services/axiosConfig.js";


export const updateUser = async (data) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
    const apiUrl = import.meta.env.VITE_URL_UPDATEUSERS;
    return await axiosConfig.put(apiUrl,data, {headers})
        .then(response => {
            if(response.status===200){
                return response.data;
            }
            return {type:'error', title:'Aviso',msg:'En este momento no se puedo realizar la actualizacion, vuelve a intentar',user:null,};
        })
        .catch(error => {
            return {type:'error', title:'Aviso',msg:'En este momento no se puedo realizar la actualizacion, vuelve a intentar',user:null,}
        });
}

export const updatePassword = async (data) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
    const apiUrl = import.meta.env.VITE_URL_UPDATEPSW;
    return await axiosConfig.put(apiUrl,data, {headers})
        .then(response => {
            if(response.status===200){
                return response.data;
            }
            return {type:'error', title:'Aviso',msg:'En este momento no se puedo realizar la actualizacion, vuelve a intentar',user:null,};
        })
        .catch(error => {
            return {type:'error', title:'Aviso',msg:'En este momento no se puedo realizar la actualizacion, vuelve a intentar',user:null,}
        });
}