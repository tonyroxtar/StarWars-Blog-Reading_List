import React from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import injectContext from "./store/appContext"; // Asegúrate de que esta ruta es correcta

const AppWithContext = injectContext(App);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppWithContext />);
