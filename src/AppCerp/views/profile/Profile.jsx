import {useState} from "react";
import {Breadcrumb} from "@gull";
import GeneralUsersData from "@AppCerp/component/pages/users/GeneralUsersData.jsx";
import {useSelector} from "react-redux";

const Profile = () => {

    const {user} = useSelector((state) => state.auth);


    return (
        <div className="mt-2">
            <Breadcrumb
                routeSegments={[
                    {name: "Home", path: "/"},
                    {name: "Configuración de cuenta"},
                ]}
            />
            <section >
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 ">
                                <div className="card-title"><b>Datos Generales</b></div>
                                <GeneralUsersData user={user} isNew={false}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Profile;
