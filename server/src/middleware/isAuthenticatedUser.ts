import { config } from "dotenv";
config();
import { NextFunction, Response } from "express";
import logger from "../utils/logger/logger";
import { MyResponse } from "../types/myResponse";
import { JWTPayload, jwtVerify } from "jose";
import { AuthenticatedUserRequest } from "../types/authenticate";

const isAuthenticated = async (
  req: AuthenticatedUserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken = req.cookies.accessToken;
    logger.info("User authentication initiated...");

    if (!accessToken) {
      logger.error("Access token missing or expired.");
      res.status(401).json({
        success: false,
        message: "Access token missing or expired",
      });
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET not found in environment variables");
    }

    const { payload } = (await jwtVerify(
      accessToken,
      new TextEncoder().encode(secret)
    )) as {
      payload: JWTPayload & {
        userId: string;
        name: string | null;
        email: string;
        role: string;
      };
    };

    req.user = {
      userId: payload.userId,
      name: payload.name,
      email: payload.email,
      role: payload.role,
    };

    logger.info(
      `${payload.name} authenticated as ${payload.role} successfully.`
    );
    next();
  } catch (error) {
    logger.error("Error during authentication", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during authentication",
      error: error instanceof Error ? error.message : "Authentication failed",
    });
  }
};

export { isAuthenticated };
