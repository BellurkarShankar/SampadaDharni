import { Router } from "express";
import { signUp } from "../controllers/authController";

const authRoute = Router();

authRoute.post("/register", signUp);

export default authRoute;
