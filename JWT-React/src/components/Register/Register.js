import React, { useEffect } from "react";
import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = (props) => {
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
                        <input type="text" className="form-control" placeholder="Username" />
                        <input type="text" className="form-control" placeholder="Phone number" />
                        <input type="text" className="form-control" placeholder="Email address or phone number" />
                        <input type="password" className="form-control" placeholder="Password" />
                        <input type="password" className="form-control" placeholder="Confim password" />
                        <button className="btn btn-primary">Register</button>
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
