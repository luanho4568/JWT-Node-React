import express from "express";
import { handleLogin, handleRegister, testApi } from "../controller/testApiController";

const router = express.Router();
/**
 *
 * @param {*} app : express app
 */
const initAPIRoutes = (app) => {
    router.get("/test-api",testApi)
    router.post("/register",handleRegister)
    router.post("/login",handleLogin)
    return app.use("/api/v1/", router);
};

export default initAPIRoutes;
