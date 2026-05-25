import express from "express";
import cookieParser from "cookie-parser";
import router from "./modules/auth/routes.js";
import ApiError from "./common/utils/api-errors.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("api/auth", router);

//catch all undefined routes
app.all("*", (req, next) => {
  next(ApiError.notfound(res, `route ${req.originalUrl} does not exist`));
});
export default app;
