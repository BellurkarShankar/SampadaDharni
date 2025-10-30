"use server";

import { signUpProtectionRules } from "@/arcjet";
import arcjet, { request } from "@arcjet/next";

export const signUpProtectionRulesAction = async (email: string) => {
  const req = await request();
  const decision = await signUpProtectionRules.protect(req, { email });
  if (decision.isDenied()) {
    if (decision.reason.isEmail()) {
      const emailTypes = decision.reason.emailTypes;
      if (emailTypes?.includes("DISPOSABLE")) {
        return {
          error: "Disposable email address not allowed",
          success: false,
          status: 403,
        };
      } else if (emailTypes?.includes("INVALID")) {
        return {
          error: "Invalid Email",
          success: false,
          status: 403,
        };
      } else if (emailTypes?.includes("NO_MX_RECORDS")) {
        return {
          error:
            "Email domain does not have a valid mx-records. Please try with different email address",
          success: false,
          status: 403,
        };
      }
    }
  } else if (decision.reason.isBot()) {
    return {
      error: "Bot activity detected",
      success: false,
      status: 403,
    };
  } else if (decision.reason.isRateLimit()) {
    return {
      error: "Too many request",
      success: false,
      status: 403,
    };
  }
  return {
    success: true,
  };
};
