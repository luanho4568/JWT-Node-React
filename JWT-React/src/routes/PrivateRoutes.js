import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) => {
    const history = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        console.log(">>> check context user : ", user);

        let session = sessionStorage.getItem("account");
        if (!session) {
            history("/login");
            window.location.reload();
        }
    }, []);
    return (
        <>
            <Outlet />
        </>
    );
};
export default PrivateRoutes;
