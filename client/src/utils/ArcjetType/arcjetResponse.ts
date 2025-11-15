import { ArcjetErrorReason } from "@arcjet/next";

export type ActionResponse = {
  success: boolean;
  error?: string | ArcjetErrorReason | any;
  message: string;
  status: number;
};
