import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken, type userToken } from "../utils/token.js";
 

export function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const header = req.headers["authorization"];

  if (!header) return res.status(404).json({ message: `header not found` });

  const token = header.split(" ")[1];

  if (!token)
    return res.status(404).json({ error: `token not found or incorrect` });

  const user = verifyAccessToken(token) as userToken;

  if (!user)
    return res
      .status(404)
      .json({ message: `authentication expired, login is required` });

  req.id = user;

  next();
}

export function restrictUnAuthicatedUser(req:Request, res:Response, next:NextFunction){
        if(!req.user){
            return res.status(401).json({message: `authentication required`})
           
        }
        return next()
}
