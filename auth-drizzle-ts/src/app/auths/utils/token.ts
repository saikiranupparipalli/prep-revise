import jwt from "jsonwebtoken";
import dotenv from "dotenv/config"
import { createHmac, randomBytes } from "node:crypto";
export interface userToken {
  id: string;
}
export const accessToken = (payload: userToken) => {
  jwt.sign(payload, process.env.ACCESS_TOKEN !, {
    expiresIn:process.env.ACCESS_TOKEN_EXPIRES || "2min"
  });
};

export const verifyAccessToken = (token :string)=>{
   try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN!) as userToken
    return payload 
   } catch (error) {
    return null
   }
}

export const refreshToken  = (payload: userToken)=>{
    jwt.sign(payload, process.env.REFRESH_TOKEN !, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "4d"
    })
}

export const verifyRefreshToken = (token: string)=>{
    jwt.verify(token, process.env.REFRESH_TOKEN!)
}


 