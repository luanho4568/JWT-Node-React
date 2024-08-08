import jwt, { decode } from "jsonwebtoken";
import "dotenv/config";

const nonSecurePaths = ["/", "/register", "/login"];
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
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);
    } catch (error) {
        console.log(error);
    }
    return decoded;
};

const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    let cookies = req.cookies;
    if (cookies && cookies.jwt) {
        let token = cookies.jwt;
        let decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).json({
                EC: -1,
                EM: "Not authenticated the user",
                DT: "",
            });
        }
    } else {
        return res.status(401).json({
            EC: -1,
            EM: "Not authenticated the user",
            DT: "",
        });
    }
    console.log(cookies);
};

const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    if (req.user) {
        let email = req.user.email;
        let roles = req.user.groupWithRoles.Roles;
        let currentUrl = req.path;
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EC: -1,
                EM: `You don't have permission to access this resource...`,
                DT: "",
            });
        }
        let canAccess = roles.some((item) => item.url === currentUrl);
        if (canAccess) {
            next();
        } else {
            return res.status(403).json({
                EC: -1,
                EM: `You don't have permission to access this resource...`,
                DT: "",
            });
        }
    } else {
        return res.status(401).json({
            EC: -1,
            EM: "Not authenticated the user",
            DT: "",
        });
    }
};
export { createJWT, verifyToken, checkUserJWT, checkUserPermission };
