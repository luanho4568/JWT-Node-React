import React, { useEffect, useState } from "react";
import "./Register.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { registerNewUser } from "../../services/userService";
const Register = (props) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    };
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);
    const history = useNavigate();
    useEffect(() => {
        // axios
        //     .get("http://localhost:8888/api/v1/test-api")
        //     .then((data) => {
        //         console.log(">>> check data", data);
        //     })
        //     .catch((error) => {
        //         console.log(">>> Error : ", error);
        //     });
    }, []);

    const isValidInput = () => {
        setObjCheckInput(defaultValidInput);
        if (!email) {
            toast.error("Email is required!");
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error("Invalid email format!");
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }
        if (!password) {
            toast.error("Password is required!");
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Password and confirm password must match!");
            setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
            return false;
        }
        if (!phone) {
            toast.error("Phone is required!");
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
            return false;
        }

        return true;
    };
    const handleRegister = async () => {
        const check = isValidInput();
        if (check) {
            let response = await registerNewUser({ email, password, phone, username });
            let serverData = response;
            if (+serverData.EC === 0) {
                toast.success(serverData.EM);
                history("/login");
            } else {
                toast.error(serverData.EM);
            }
        }
        // let userData = { email, username, password, phone, confirmPassword };
        // console.log(">>> check user data : ", userData);
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
                            className={objCheckInput.isValidPhone ? "form-control" : "form-control is-invalid"}
                            placeholder="Phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <input
                            type="email"
                            className={objCheckInput.isValidEmail ? "form-control" : "form-control is-invalid"}
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            className={objCheckInput.isValidPassword ? "form-control" : "form-control is-invalid"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            className={
                                objCheckInput.isValidConfirmPassword ? "form-control" : "form-control is-invalid"
                            }
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
