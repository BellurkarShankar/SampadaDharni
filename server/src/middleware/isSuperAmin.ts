import { NextFunction, Response } from "express";
import { AuthenticatedUserRequest } from "../types/authenticate";
import logger from "../utils/logger/logger";
import { MyResponse } from "../types/myResponse";

export const isSuperAdmin = async (
  req: AuthenticatedUserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.info("SUPERADMIN authentication has started.");
    if (req.user && req.user.role !== "SUPERADMIN") {
      const ErrorResponse: MyResponse = {
        success: false,
        message: "Access denied! Super admin access required",
      };
      res.status(403).json(ErrorResponse);
    }

    logger.info(`${req.user?.name} authenticated as SUPERADMIN successfully.`);
    next();
  } catch (error) {
    logger.error("Error during SuperAdmin authentication", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during authentication",
      error: error instanceof Error ? error.message : "Authentication failed",
    });
  }
};
