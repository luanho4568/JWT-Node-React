import ret from "bluebird/js/release/util";
import { handleRegisterNewUser } from "../service/loginRegisterService";

const testApi = (req, res) => {
    return res.status(200).json({
        message: "Ok",
        data: "Test API",
    });
};

const handleRegister = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.phone) {
            return res.status(200).json({
                EM: "Missing required parameters", // error message
                EC: "1", // error code
                DT: "", // data
            });
        }
        if (req.body.password && req.body.password.length < 6) { 
            return res.status(200).json({
                EM : "Your password must have more than 6 letter",
                EC: "1", // error code
                DT: "", // data
            });
        }
        // service create user
        let data = await handleRegisterNewUser(req.body)
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data
        });
    } catch (error) {
        return res.status(500).json({
            EM: "Error from server", // error message
            EC: "-1", // error code
            DT: "", // data
        });
    }
    console.log(">>> call me", req.body);
};
export { testApi, handleRegister };
