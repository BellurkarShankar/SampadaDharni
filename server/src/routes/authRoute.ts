import { Router } from "express";
import { login, signUp } from "../controllers/authController";

const authRoute = Router();

authRoute.post("/register", signUp);
authRoute.post("/login", login);

export default authRoute;
