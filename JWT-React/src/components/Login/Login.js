import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";

const Login = (props) => {
    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true,
    };
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);
    const history = useNavigate();

    const handeleCreateNewAccount = () => {
        history("/register");
    };
    const handleLogin = async () => {
        setObjValidInput(defaultObjValidInput);
        if (!valueLogin) {
            toast.error("Please enter your email address or phone number");
            setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
            return;
        }
        if (!password) {
            toast.error("Please enter your password");
            setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
            return;
        }
        let response = await loginUser({ valueLogin, password });
        console.log(">>> check response : ", response.data);
        if (response && response.data && +response.data.EC === 0) {
            // success
            let data = {
                isAuthenticated: true,
                token: "fake token",
            };
            sessionStorage.setItem("account", JSON.stringify(data));
            history("/users");
        }
        if (response && response.data && +response.data.EC !== 0) {
            // error
            setErrMessage(response.data.EM);
        }
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
                            className={objValidInput.isValidValueLogin ? "form-control" : "form-control is-invalid"}
                            placeholder="Email address or phone number"
                            value={valueLogin}
                            onChange={(e) => {
                                setValueLogin(e.target.value);
                            }}
                        />
                        <input
                            type="password"
                            className={objValidInput.isValidPassword ? "form-control" : "form-control is-invalid"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <span className="text-center" style={{ color: "red", fontSize: "10px" }}>
                            {errMessage}
                        </span>
                        <button className="btn btn-primary" onClick={() => handleLogin()}>
                            Log In
                        </button>
                        <span className="text-center">
                            <Link className="forgot-password" href="#">
                                Forgotten password?
                            </Link>
                        </span>
                        <hr />
                        <div className="text-center">
                            <button className="btn btn-success" onClick={() => handeleCreateNewAccount()}>
                                Create new account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
