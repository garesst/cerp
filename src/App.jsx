import "./styles/app/app.scss";

import Auth from "@AppCerp/auth/Auth.jsx";
import {RouterProvider} from "react-router-dom";
import routes from "@AppCerp/routes.jsx";
import {useSelector} from "react-redux";

function App() {
    const { loading } = useSelector((state) => state.auth);
  return (
      <>
          <Auth >
              {
                  !loading?(<RouterProvider router={routes} />):(<div>Cargando</div>)
              }

          </Auth>
      </>
  )
}

export default App
