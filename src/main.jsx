import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { store } from "./AppCerp/store.js";
import App from './App.jsx';
// import reportWebVitals from "./reportWebVitals";
import "./index.css";
import "./index.scss";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
);

// reportWebVitals();
