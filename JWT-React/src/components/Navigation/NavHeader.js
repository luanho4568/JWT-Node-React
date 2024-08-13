import React, { useContext } from "react";
import "./Nav.scss";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { logoutUser } from "../../services/userService";
import { toast } from "react-toastify";

const NavComponent = () => {
    const { user, logoutContext } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();
    const handleLogout = async () => {
        let data = await logoutUser(); //clear cookies
        localStorage.removeItem("jwt"); // clear local storage
        logoutContext();
        if (+data?.EC === 0) {
            toast.success("Log out successfully!!!");
            navigate("/login");
        } else {
            toast.error(data.EM);
        }
    };
    if ((user && user.isAuthenticated) || location.pathname === "/") {
        return (
            <div className="nav-header">
                <Navbar bg="header" expand="lg">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink className="nav-link"  to="/">
                                    Home
                                </NavLink>
                                <NavLink className="nav-link" to="/users">
                                    Users
                                </NavLink>
                                <NavLink className="nav-link" to="/roles">
                                    Roles
                                </NavLink>
                                <NavLink className="nav-link" to="/about">
                                    About
                                </NavLink>
                            </Nav>
                            <Nav>
                                {user?.isAuthenticated ? (
                                    <>
                                        <Nav.Item className="nav-link">Welcome {user.account.username} !</Nav.Item>
                                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                                            <NavDropdown.Item className="item-dr">ChangePassword</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item className="item-dr" onClick={() => handleLogout()}>
                                                Log out
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </>
                                ) : (
                                    <Link to="/login" className="nav-link">
                                        Login
                                    </Link>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    } else {
        return null;
    }
};

export default NavComponent;
