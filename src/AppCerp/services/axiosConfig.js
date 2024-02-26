// axiosConfig.js

import axios from 'axios';
import localStorageService from "@AppCerp/services/localStorageService.js";

const instance = axios.create();

// Configurar un interceptor para agregar el token a todas las solicitudes
instance.interceptors.request.use(
    (config) => {
        const  accessToken = localStorageService.getItem("jwt_token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
