import express from "express";
import { handleLogin, handleLogout, handleRegister, testApi } from "../controller/testApiController";
import { createFunc, deleteFunc, getUserAccount, readFunc, updateFunc } from "../controller/userController";
import { readGroupFunc } from "../controller/groupController";
import { checkUserJWT, checkUserPermission } from "../middelware/JWTaction";
import { assignRoleToGroupFunc, createRoleFunc, deleteRoleFunc, getRoleByGroupFunc, readRoleFunc } from "../controller/roleController";

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
    router.post("/logout", handleLogout);

    router.get("/account", getUserAccount);

    // user routes
    router.get("/user/read", readFunc);
    router.post("/user/create", createFunc);
    router.put("/user/update", updateFunc);
    router.delete("/user/delete", deleteFunc);

    // roles routes
    router.get("/role/read", readRoleFunc);
    router.post("/role/create", createRoleFunc);
    // router.put("/role/update", updateRoleFunc);
    router.delete("/role/delete", deleteRoleFunc);
    router.get("/role/by-group/:groupId", getRoleByGroupFunc);
    router.post("/role/assign-to-group", assignRoleToGroupFunc);
    
    // group routes
    router.get("/group/read", readGroupFunc);

    return app.use("/api/v1/", router);
};

export default initAPIRoutes;
