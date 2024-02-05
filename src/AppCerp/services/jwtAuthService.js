import axios from "axios";
import localStorageService from "./localStorageService";

class JwtAuthService {
  
  user = {
    userId: "",
    role: 'ADMIN',
    displayName: "",
    email: "",
    photoURL: "",
    age: 0,
    token: ""
  }

  loginWithEmailAndPassword = (email, password) => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }
    const apiUrl = import.meta.env.VITE_URL_API_LOGIN;
    const requestData = {
      username: email,
      password: password
    };
    return axios.post(apiUrl, requestData,{headers})
        .then(response => {
          const {backendTokens,user} = response.data;
          this.setSession(backendTokens.accessToken);
          this.setUser({...user,role: 'ADMIN',});
          // console.log("user;",user);
          return {...user,role: 'ADMIN',token:backendTokens.accessToken};
        })
        .catch(error => {
          // Manejar errores
          console.error("Error en la solicitud:", error);
          throw error; // Decidir si quieres propagar el error o manejarlo de alguna otra manera
        });
  };

  loginWithToken = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.user);
      }, 100);
    }).then(data => {
      this.setSession(data.token);
      this.setUser(data);
      return data;
    });
  };

  

  logout = () => {
    this.setSession(null);
    this.removeUser();
  }

  setSession = token => {
    if (token) {
      localStorage.setItem("jwt_token", token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      localStorage.removeItem("jwt_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };
  setUser = (user) => {    
    localStorageService.setItem("auth_user", user);
  }
  removeUser = () => {
    localStorage.removeItem("auth_user");
  }
}

export default new JwtAuthService();
