import arcjet, {
  detectBot,
  fixedWindow,
  protectSignup,
  shield,
  validateEmail,
} from "@arcjet/next";

export const signUpProtectionRules = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    protectSignup({
      email: {
        mode: "LIVE",
        block: ["DISPOSABLE", "NO_MX_RECORDS", "INVALID"],
      },
      bots: {
        mode: "LIVE",
        allow: [],
      },
      rateLimit: {
        mode: "LIVE",
        max: 5,
        interval: "10m",
      },
    }),
  ],
});

export const signInProtectionRules = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    validateEmail({
      mode: "LIVE",
      deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
    }),
  ],
});

export const protectionOfCreateProduct = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    detectBot({
      mode: "LIVE",
      allow: [],
    }),
    fixedWindow({
      mode: "LIVE",
      window: 60,
      max: 5,
    }),
    shield({
      mode: "LIVE",
    }),
  ],
});
