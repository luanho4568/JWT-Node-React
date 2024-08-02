import express from "express";
import { handleHelloWorld } from "../controller/homeController";

const router = express.Router();
/**
 *
 * @param {*} app : express app
 */
const initWebRoutes = (app) => {
    router.get("/", handleHelloWorld);

    return app.use("/", router);
};

export default initWebRoutes;
