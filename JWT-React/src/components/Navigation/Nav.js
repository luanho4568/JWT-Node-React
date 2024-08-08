import React, { useContext } from "react";
import "./Nav.scss";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
const Nav = (props) => {
    const { user } = useContext(UserContext);
    const location = useLocation();
    if ((user && user.isAuthenticated === true) || location.pathname === "/") {
        return (
            <>
                <div className="topnav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/users">user</NavLink>
                    <NavLink to="/projects">projects</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            </>
        );
    } else {
        return <></>;
    }
};

export default Nav;
