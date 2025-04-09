import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
//import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoute from "./route/auth.js"
import userRoute from "./route/users.js"
import checkoutRoute from "./route/checkout.js"
import logRoute from "./route/logs.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); // set the dir of where assets are located

/*ROUTES*/ 
app.use("/auth", authRoute)
app.use("/users", userRoute)
app.use("/checkout", checkoutRoute)
app.use("/logs", logRoute)


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 10000;
mongoose.connect(process.env.MONGO_URL, {
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

}).catch((error) => console.log(`${error} did not connect`));