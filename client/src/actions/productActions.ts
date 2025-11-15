"use server";
import { protectionOfCreateProduct } from "@/arcjet";
import { ActionResponse } from "@/utils/ArcjetType/arcjetResponse";
import { request } from "@arcjet/next";

export const createProductProtection = async (): Promise<ActionResponse> => {
  const req = await request();
  const decision = await protectionOfCreateProduct.protect(req);
  const serializeReason = (reason: any) => {
    if (!reason) return null;

    return {
      type: reason.type,
      max: reason.max,
      remaining: reason.remaining,
      reset: reason.reset,
      window: reason.window,
      resetTime: reason.resetTime,
    };
  };
  if (decision.isDenied()) {
    return {
      success: false,
      error: serializeReason(decision.reason),
      message: decision.reason.isBot()
        ? "Bot detected"
        : "Arcjet validation failed",
      status: 403,
    };
  }
  return {
    success: true,
    message: "there is no activity detected",
    status: 200,
  };
};
