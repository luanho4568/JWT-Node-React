import jwt from "jsonwebtoken";
import "dotenv/config";

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        let token = jwt.sign(payload, key);
        return token;
    } catch (error) {
        console.log(error);
    }
    return token;
};

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;
    try {
        let decoded = jwt.verify(token, key);
        data = decoded;
    } catch (error) {
        console.log(error);
    }
    return data;
};
export { createJWT, verifyToken };
