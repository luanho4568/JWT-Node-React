import express from "express";
import { handleLogin, handleRegister, testApi } from "../controller/testApiController";
import { createFunc, deleteFunc, readFunc, updateFunc } from "../controller/userController";
import { readGroupFunc } from "../controller/groupController";

const router = express.Router();
/**
 *
 * @param {*} app : express app
 */
const initAPIRoutes = (app) => {
    router.get("/test-api",testApi)
    router.post("/register",handleRegister)
    router.post("/login",handleLogin)

    router.get("/user/read",readFunc)
    router.post("/user/create",createFunc)
    router.put("/user/update",updateFunc)
    router.delete("/user/delete",deleteFunc)
    
    router.get("/group/read",readGroupFunc)

    return app.use("/api/v1/", router);
};

export default initAPIRoutes;
