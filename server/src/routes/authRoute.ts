import { Router } from "express";
import { login, logout, signUp } from "../controllers/authController";

const authRoute = Router();

authRoute.post("/register", signUp);
authRoute.post("/login", login);
authRoute.post("/logout", logout);
export default authRoute;
