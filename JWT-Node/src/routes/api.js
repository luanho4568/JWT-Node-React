import express from "express";
import { handleLogin, handleRegister, testApi } from "../controller/testApiController";
import { createFunc, deleteFunc, getUserAccount, readFunc, updateFunc } from "../controller/userController";
import { readGroupFunc } from "../controller/groupController";
import { checkUserJWT, checkUserPermission } from "../middelware/JWTaction";

const router = express.Router();
/**
 *
 * @param {*} app : express app
 */

// const checkUser = (req, res, next) => {
//     const nonSecurePaths = ["/register", "/login"];
//     if (nonSecurePaths.includes(req.path)) return next();
//     next();
// };

const initAPIRoutes = (app) => {
    router.all("*", checkUserJWT, checkUserPermission);

    router.post("/register", handleRegister);
    router.post("/login", handleLogin);
    router.get("/account", getUserAccount);

    router.get("/user/read", readFunc);
    router.post("/user/create", createFunc);
    router.put("/user/update", updateFunc);
    router.delete("/user/delete", deleteFunc);

    router.get("/group/read", readGroupFunc);

    return app.use("/api/v1/", router);
};

export default initAPIRoutes;
