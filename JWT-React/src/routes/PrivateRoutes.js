import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) => {
    const { user } = useContext(UserContext);
    console.log(user);

    if (user && user.isAuthenticated === true) {
        return (
            <>
                <Outlet />
            </>
        );
    } else {
        return <Navigate to="/login"></Navigate>;
    }
};
export default PrivateRoutes;
