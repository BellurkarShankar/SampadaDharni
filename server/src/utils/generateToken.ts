import jwt from "jsonwebtoken";
import { v4 as versionFour } from "uuid";
type TokenGenerateType = {
  accessToken: string;
  refreshToken: string;
};
export const generateToken = async (
  userId: string,
  email: string,
  role: string
): Promise<TokenGenerateType> => {
  const accessToken = jwt.sign(
    {
      userId,
      email,
      role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1hr",
    }
  );

  const refreshToken = versionFour();
  return {
    accessToken,
    refreshToken,
  };
};
