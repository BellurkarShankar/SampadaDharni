import { Request } from "express";

export interface AuthenticatedUserRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
    name: string | null;
  };
}
