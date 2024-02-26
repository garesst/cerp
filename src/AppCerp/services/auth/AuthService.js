import {store} from '../../store.js';
import axios from "axios";


export const signup = async (data) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
    const apiUrl = import.meta.env.VITE_URL_API_REGISTER;
    console.log(data);
    const requestData = {
        email : data.email,
        codGiro : data.lineOfBusiness,
        password : data.password,
        codTipoNegocio : data.typeBusiness,
        tenant : data.workspace,
    };
    return await axios.post(apiUrl, requestData, {headers})
        .then(response => {
            console.log(response)
            return {ok:"ok", status:"success",msg:"Tu registro fue exitoso, revisa tu email para validar tu registro.",title:"Registro Completado!"};
        })
        .catch(error => {
            // Manejar errores
            console.error("Error en la solicitud:", error);
            return {ok:"no",status:"error",msg:error.response.data.message,title:"Ocurrio un error!"}
        });
}

export const activateUserTenant = async (idUser) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
    const apiUrl = import.meta.env.VITE_URL_ACTIVATE;
    const requestData = {
        idUser
    };
    return await axios.put(apiUrl, requestData, {headers})
        .then(response => {
            // console.log(response)
            return response.data.code;
        })
        .catch(error => {
            // Manejar errores
            // console.error("Error en la solicitud:", error);
            return 0;
        });
}

export const searchTenantByUser = async (email) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
    const apiUrl = import.meta.env.VITE_URL_TENANTBYEMAIL+email;
    return await axios.get(apiUrl, {headers})
        .then(response => {
            // console.log(response)
            return response.data;
        })
        .catch(error => {
            // Manejar errores
            // console.error("Error en la solicitud:", error);
            return 0;
        });
}


let authenticated = false;
let tokenUser = '';

export const getAuthStatus = () => authenticated;
export const getAuthToken = () => tokenUser;

store.subscribe(state => {
    if (state){
        authenticated = state.auth.isAuthenticated;
        tokenUser = state.accessToken;
    }
})