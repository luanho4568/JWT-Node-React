import "./App.scss";
import Nav from "./components/Navigation/Nav";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import { useEffect, useState } from "react";
import _ from "lodash";
import AppRoutes from "./routes/AppRoutes";
function App() {
    return (
        <>
            <Router>
                <div className="app-header">
                    <Nav />
                </div>
                <div className="app-container">
                    <AppRoutes />
                </div>

                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
            </Router>
        </>
    );
}

export default App;
