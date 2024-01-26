import logo_light_icon from "../../../assets/dist/images/logos/logo-light-icon.png"
import logo_light_text from "../../../assets/dist/images/logos/logo-light-text.png"
import LoginForm from "./LoginForm/LoginForm.jsx";
import RegisterForm from "./LoginForm/RegisterForm.jsx";
import {useEffect, useState} from "react";

const UserPage = () => {
    const [state, setState] = useState({
        pageCurrent:'login'
    });
    const changeState = (value) => {
        setState(value);
    };
    console.log('',state.pageCurrent)
    return (
        <>
            <div className="row auth-wrapper gx-0">
                <div className="col-lg-4 col-xl-3 bg-info auth-box-2 on-sidebar">
                    <div className="h-100 d-flex align-items-center justify-content-center">
                        <div className="row justify-content-center text-center">
                            <div className="col-md-7 col-lg-12 col-xl-9">
                                <div>
                        <span className="db">
                            <img src={logo_light_icon} alt="logo"/>
                        </span>
                                    <span className="db">
                            <img src={logo_light_text} alt="logo"/>
                        </span>
                                </div>
                                <h2 className="text-white mt-4 fw-light">
                                    Gestiona con
                                    <span className="font-weight-medium"> CERP </span>
                                    de manera eficiente como nunca antes...
                                </h2>
                                <p className="op-5 text-white fs-4 mt-4">
                                    Administra de forma eficaz tus negocios con un sistema CRM/ERM hecho a la medida de
                                    tu negocio para lograr tus metas
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 col-xl-9 d-flex align-items-center justify-content-center">
                    <div className="row justify-content-center w-100 mt-4 mt-lg-0">
                        <div className="col-lg-6 col-xl-3 col-md-7">
                            {

                                (state.pageCurrent==='login')?<LoginForm changeState={changeState} />:<RegisterForm changeState={changeState}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default UserPage;