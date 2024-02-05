import "./styles/app/app.scss";

import Auth from "@AppCerp/auth/Auth.jsx";
import {RouterProvider} from "react-router-dom";
import routes from "@AppCerp/routes.jsx";

function App() {

  return (
      <>
          <Auth >
              <RouterProvider router={routes} />
          </Auth>
      </>
  )
}

export default App
