import { Request, Response } from "express";
import { MyResponse } from "../types/myResponse";
import { signUpSchema } from "../validation/signUpSchema";
import bcrypt from "bcryptjs";
import { prisma } from "../server";
import { loginSchema } from "../validation/loginSchema";
import { generateToken } from "../utils/generateToken";
import { setToken } from "../utils/setToken";
import jwt from "jsonwebtoken";
export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const validationResult = signUpSchema.safeParse(req.body);
    if (!validationResult.success) {
      console.log(validationResult.error.message);
      const exactIssue = validationResult.error.issues.map((issue) => {
        return {
          path: issue.path,
          message: issue.message,
        };
      });

      const validationError: MyResponse = {
        success: false,
        message: "Validation Error",
        error: exactIssue,
      };
      res.status(400).json(validationError);
      return;
    }

    const { name, email, password, role } = validationResult.data;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      const existingUserResponse: MyResponse = {
        success: false,
        message: "User already exist..",
      };
      res.status(201).json(existingUserResponse);
      return;
    }

    const hasPass = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role,
        password: hasPass,
      },
    });
    console.log("New User :", newUser);

    const successResponse: MyResponse = {
      success: true,
      message: "User has been created Successfully..",
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        userId: newUser.id,
      },
    };
    res.status(200).json(successResponse);
  } catch (error) {
    const errorResponse: MyResponse = {
      message: "Internal server error",
      success: false,
      error: error instanceof Error ? error.message : error,
    };
    res.status(500).json(errorResponse);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const credentialValidation = loginSchema.safeParse(req.body);

    if (!credentialValidation.success) {
      const exactIssue = credentialValidation.error.issues.map((issue) => {
        return {
          path: issue.path,
          message: issue.message,
        };
      });
      const validationError: MyResponse = {
        success: false,
        message: "Validation Error",
        error: exactIssue,
      };
      res.status(400).json(validationError);
      return;
    }

    const { email, password } = credentialValidation.data;

    const isUserPresent = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (
      !isUserPresent ||
      !(await bcrypt.compare(password, isUserPresent.password))
    ) {
      const loginFailedResponse: MyResponse = {
        success: false,
        message: "Login Failed! Invalid Credentials",
      };
      res.status(401).json(loginFailedResponse);
      return;
    }
    const { accessToken, refreshToken } = await generateToken(
      isUserPresent?.id,
      isUserPresent?.email,
      isUserPresent?.role
    );
    const updateRefreshToken = await prisma.user.update({
      data: {
        refreshToken,
      },
      where: {
        email: isUserPresent.email,
      },
    });
    await setToken(res, accessToken, refreshToken);

    const loginSuccessResponse: MyResponse = {
      success: true,
      message: "User logged-In Successfully",
      user: {
        name: isUserPresent.name,
        email: isUserPresent.email,
        role: isUserPresent.role,
        userId: isUserPresent.id,
      },
    };
    res.status(200).json(loginSuccessResponse);
  } catch (error) {
    const errorResponse: MyResponse = {
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : error,
    };
    res.status(500).json(errorResponse);
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    const logoutSuccessResponse: MyResponse = {
      success: true,
      message: "User Logged Out successfully..",
    };
    res.status(200).json(logoutSuccessResponse);
  } catch (error) {
    const logoutError: MyResponse = {
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : error,
    };
    res.status(500).json(logoutError);
  }
};

export const issueRefreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      const refreshTokenErrorResponse: MyResponse = {
        success: false,
        message: "token has been expired or invalid token",
      };
      res.status(401).json(refreshTokenErrorResponse);
      return;
    }
    let decodedRefreshToken;
    try {
      decodedRefreshToken = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET as string
      ) as {
        id: string;
        name: string | null;
        email: string;
        role: string;
      };
    } catch {
      res.status(403).json({
        success: false,
        message: "Invalid refresh token",
      });
      return;
    }
    const user = await prisma.user.findUnique({
      where: { id: decodedRefreshToken.id },
    });
    if (!user || user.refreshToken !== refreshToken) {
      const userNotFound: MyResponse = {
        success: false,
        message: "Refresh token mismatch or User not found",
      };
      res.status(401).json(userNotFound);
      return;
    }
    const { accessToken, refreshToken: newRefreshToken } = await generateToken(
      user.id,
      user.email,
      user.role
    );
    await setToken(res, accessToken, newRefreshToken);
    const updatedRefreshToken = await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });
    const successResponse: MyResponse = {
      success: true,
      message: "A new refresh-token has been successfully provided..",
    };
    res.status(200).json(successResponse);
  } catch (error) {
    const errorResponse: MyResponse = {
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : error,
    };
    res.status(500).json(errorResponse);
  }
};
