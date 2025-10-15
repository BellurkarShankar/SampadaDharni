import { Router } from "express";
import {
  issueRefreshToken,
  login,
  logout,
  signUp,
} from "../controllers/authController";

const authRoute = Router();

authRoute.post("/register", signUp);
authRoute.post("/login", login);
authRoute.post("/logout", logout);
authRoute.post("/refreshToken", issueRefreshToken);
export default authRoute;
