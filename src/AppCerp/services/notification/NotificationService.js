import axiosConfig from "@AppCerp/services/axiosConfig.js";


export const getNotifications = async (idUser) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
    const apiUrl = import.meta.env.VITE_URL_NOTIBYUSER+idUser;
    return await axiosConfig.get(apiUrl, {headers})
        .then(response => {
            if(response.status===200){
                return response.data;
            }
            return [];
        })
        .catch(error => {
            return []
        });
}