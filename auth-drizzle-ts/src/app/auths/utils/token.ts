import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";
import { createHmac, randomBytes } from "node:crypto";
export interface userToken {
  id: string;
  email: string;
}
export const accessToken = (payload: userToken) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN!, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "2min",
  });
};

export const verifyAccessToken = (token: string) => {
  const payload = jwt.verify(token, process.env.ACCESS_TOKEN!) as userToken;
  return payload;
};

export const refreshToken = (payload: userToken) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN!, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "4d",
  });
};

export const verifyRefreshToken = (token: string) => {
  const payload = jwt.verify(token, process.env.REFRESH_TOKEN!);
  return payload;
};
