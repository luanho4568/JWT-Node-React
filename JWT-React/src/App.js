import "./App.scss";
import Login from "./components/Login/Login";
import Nav from "./components/Navigation/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import { ToastContainer, Bounce } from "react-toastify";
import User from "./components/ManageUsers/User";
import { useEffect, useState } from "react";
import _ from "lodash";
function App() {
    const [account, setAccount] = useState({});
    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (session) {
            setAccount(JSON.parse(session));
        }
    }, []);
    return (
        <Router>
            <div className="app-container">
                {account && !_.isEmpty(account) && account.isAuthenticated && <Nav />}

                <Routes>
                    <Route path="/news" element="news" />
                    <Route path="/about" element="about" />
                    <Route path="/contact" element="contact" />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/users" element={<User />} />
                    <Route path="/" element="Home" />
                    <Route path="*" element="404 Not Found" />
                </Routes>
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
    );
}

export default App;
