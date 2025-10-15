import { Request, Response } from "express";
import { MyResponse } from "../types/myResponse";
import { signUpSchema } from "../validation/signUpSchema";
import bcrypt from "bcryptjs";
import { prisma } from "../server";
import { loginSchema } from "../validation/loginSchema";
import { generateToken } from "../utils/generateToken";
import { setToken } from "../utils/setToken";
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
