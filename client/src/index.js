import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import { AuthenticationContextProvider } from "store/authentication-context";

ReactDOM.render(
  <AuthenticationContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthenticationContextProvider>,
  document.getElementById("root")
);
