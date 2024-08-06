import { useEffect } from "react";
import { Outlet,  useNavigate } from "react-router-dom";

const PrivateRoutes = (props) => {
    const history = useNavigate();
    useEffect(() => {
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
