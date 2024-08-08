import React, { StrictMode } from "react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./context/UserContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
    <UserProvider>
        <App />
    </UserProvider>
);

reportWebVitals();
