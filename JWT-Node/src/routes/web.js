import express from "express";
import { getUpdateUserPage, handleCreateNewUser, handleDeleteUser, handleUpdateUser, handleUserPage } from "../controller/homeController";
import { testApi } from "../controller/testApiController";

const router = express.Router();
/**
 *
 * @param {*} app : express app
 */
const initWebRoutes = (app) => {
    router.get("/", handleUserPage);
    router.post("/users/create-user" , handleCreateNewUser)
    router.post("/delete-user/:id" , handleDeleteUser)
    router.post("/update-user/:id" , getUpdateUserPage) 
    router.post("/users/update-user" , handleUpdateUser)
    router.get("/api/test-api",testApi)
    return app.use("/", router);
};

export default initWebRoutes;
