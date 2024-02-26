import axios from "axios";
import localStorageService from "../localStorageService";

class JwtAuthService {

    user = {
        userId: "",
        displayName: "",
        email: "",
        photoURL: "",
        age: 0,
        token: ""
    }

    loginWithEmailAndPassword = (email, password, tenant) => {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
        const apiUrl = import.meta.env.VITE_URL_API_LOGIN;
        const requestData = {
            username: email,
            password: password,
            tenant,

        };
        return axios.post(apiUrl, requestData, {headers})
            .then(response => {
                const {backendTokens, user} = response.data;
                this.setSession({token:backendTokens.accessToken, refreshToken:backendTokens.refreshToken, expires: backendTokens.expiresIn});
                this.setUser({...user,});
                // console.log("user;",user);
                return {status: 'OK', user: {...user, token: backendTokens.accessToken}};
            })
            .catch(error => {
                // Manejar errores
                console.error("Error en la solicitud:", error);
                if (error.response) {
                    if (error.response.status === 500) return {
                        status: 'error',
                        msg: 'Ocurrio un error procesando la solicitud'
                    };
                    if (error.response.status === 401) return {status: 'error', msg: 'Usuario no existe'};
                    return {status: error.response.data.status, msg: error.response.data.msg};
                } else if (error.code === 'ERR_NETWORK') {
                    return {status: 'error', msg: 'Has perdido conexión con el servidor'};
                } else {
                    return {status: 'error', msg: 'Ocurrio un error procesando la solicitud'};
                }

            });
    };

    loginWithToken = () => {
        if (localStorage.getItem("auth_user") !== null && localStorage.getItem("jwt_token") !== null) {
            return Promise.resolve({
                user: JSON.parse(localStorage.getItem("auth_user")),
                token: localStorage.getItem("jwt_token"),
                success: true,
                isAuthenticated: true,
                loading: false
            });
        }
        return Promise.resolve({toke: null, success: false, isAuthenticated: false, loading: false, user: {}});
    };


    logout = () => {
        this.setSession(null);
        this.removeUser();
    }

    setSession = token => {
        if (token) {
            localStorage.setItem("jwt_token", token.token);
            localStorage.setItem("jwt_token_refresh", token.refreshToken);
            localStorage.setItem("jwt_token_expire", token.expires);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        } else {
            localStorage.removeItem("jwt_token");
            localStorage.removeItem("jwt_token_refresh");
            localStorage.removeItem("jwt_token_expire");
            delete axios.defaults.headers.common["Authorization"];
        }
    };
    getSession = () => {

    }
    setUser = (user) => {
        localStorageService.setItem("auth_user", user);
    }
    removeUser = () => {
        localStorage.removeItem("auth_user");
    }
}

export default new JwtAuthService();
