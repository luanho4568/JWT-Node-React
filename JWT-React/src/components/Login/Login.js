import React from "react";
import "./Login.scss";
import { Link, useNavigate } from 'react-router-dom';

const Login = (props) => {
    const history = useNavigate();

    const handeleCreateNewAccount = () => {
        history('/register')
    }
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
                        <input type="text" className="form-control" placeholder="Email address or phone number" />
                        <input type="password" className="form-control" placeholder="Password" />
                        <button className="btn btn-primary">Log In</button>
                        <span className="text-center">
                            <Link className="forgot-password" href="#">
                                Forgotten password?
                            </Link>
                        </span>
                        <hr />
                        <div className="text-center">
                            <button className="btn btn-success" onClick={() => handeleCreateNewAccount()}>Create new account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
