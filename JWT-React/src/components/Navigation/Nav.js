import React, { useEffect, useState } from "react";
import "./Nav.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
const Nav = (props) => {
    const [isShow, setIsShow] = useState(true);
    let location = useLocation();
    useEffect(() => {
        if (location.pathname === "/login") {
            setIsShow(false);
        }
    }, []);
    return (
        <>
            {isShow && (
                <div className="topnav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/users">user</NavLink>
                    <NavLink to="/projects">projects</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            )}
        </>
    );
};

export default Nav;
