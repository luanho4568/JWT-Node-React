import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import "dotenv/config";
import bodyParser from "body-parser";
import initAPIRoutes from "./routes/api";
import configCors from "./config/cors";
import connection from "./config/connectDB";
import { createJWT, verifyToken } from "./middelware/JWTaction";

const app = express();
const PORT = process.env.PORT || 8888;

// config cors
configCors(app);

// config view engine
configViewEngine(app);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test connection
connection();

// test JWT
createJWT();
let decodedData = verifyToken(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTHVhbiIsImVtYWlsIjoibHVhbkBnbWFpbC5jb20iLCJpYXQiOjE3MjMwMTE2Nzl9.8O3owr_ddMWbJ5ThxT4bxSQBHijhUOy-hERVRn55cnE"
);
console.log(">>> check decoded : ", decodedData);


// init web routes
initWebRoutes(app);
initAPIRoutes(app);
app.listen(PORT, () => {
    console.log(`JWT Backend is running on the port ${PORT}`);
});

export default app;
