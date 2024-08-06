import { Route, Routes } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import User from "../components/ManageUsers/User";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = (props) => {
    return (
        <>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route path="/users" element={<User />} />
                    <Route path="/projects" element="projects" />
                </Route>
                {/* <Route path="/users" element={<User />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element="Home" />
                <Route path="*" element="404 Not Found" />
            </Routes>
        </>
    );
};

export default AppRoutes;
