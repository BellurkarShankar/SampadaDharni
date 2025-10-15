import { Request, Response } from "express";
import { MyResponse } from "../types/myResponse";
import { signUpSchema } from "../validation/signUpSchema";
import bcrypt from "bcryptjs";
import { prisma } from "../server";
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
      console.log(exactIssue);

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
      data: newUser,
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
