import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const User = (props) => {
    const history = useNavigate()
    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (!session) {
            history('/login')
        }
    }, []);
    return <div>User Component</div>;
};
export default User;
