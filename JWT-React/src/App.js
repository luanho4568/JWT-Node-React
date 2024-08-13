import "./App.scss";
import NavHeader from "./components/Navigation/NavHeader";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { ColorRing } from "react-loader-spinner";
import AppRoutes from "./routes/AppRoutes";
import { UserContext } from "./context/UserContext";
function App() {
    const { user } = useContext(UserContext);
    console.log(user);
    return (
        <>
            <Router>
                {user && user.isLoading ? (
                    <div className="loading-container">
                        <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
                        />
                        <div>Loading data...</div>
                    </div>
                ) : (
                    <>
                        <div className="app-header">
                            <NavHeader />
                        </div>
                        <div className="app-container">
                            <AppRoutes />
                        </div>
                    </>
                )}
            </Router>

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
        </>
    );
}

export default App;
