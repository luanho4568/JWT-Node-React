import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) => {
    const { user } = useContext(UserContext);

    if (user && user.isAuthenticated) {
        return (
            <>
                <Outlet />
            </>
        );
    } else {
        return <Navigate to="/login"/>
    }
};
export default PrivateRoutes;
