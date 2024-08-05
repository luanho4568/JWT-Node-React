import React, { useEffect, useState } from "react";
import "./Register.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = (props) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const history = useNavigate();
    useEffect(() => {
        axios
            .get("http://localhost:8888/api/test-api")
            .then((data) => {
                console.log(">>> check data", data);
            })
            .catch((error) => {
                console.log(">>> Error : ", error);
            });
    }, []);

    const isValidInput = () => {
        if (!email) {
            toast.error("Email is required!");
            return false;
        }
        if (!password) {
            toast.error("Password is required!");
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Password and confirm password must match!");
            return false;
        }
        if (!username) {
            toast.error("Username is required!");
            return false;
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error("Invalid email format!");
            return false;
        }
        return true;
    };
    const handleRegister = () => {
        const check = isValidInput();
        let userData = { email, username, password, phone, confirmPassword };
        
        console.log(">>> check user data : ", userData);
    };
    const handeleLogin = () => {
        history(-1);
    };
    return (
        <div className="login-container mt-3">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-sm-7 col-12 d-sm-block d-none">
                        <div className="brand">Facebook</div>
                        <div className="detail">Facebook helps you connect and share with the people in your life.</div>
                    </div>
                    <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3 ">
                        <div className="brand d-sm-none">Facebook</div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confim password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={() => handleRegister()}>
                            Register
                        </button>
                        <hr />
                        <div className="text-center">
                            <button className="btn btn-success" onClick={() => handeleLogin()}>
                                Already've an account. Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
