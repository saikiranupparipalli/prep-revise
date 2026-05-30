import type { Request, Response } from "express";
import { signInModel, signUpModel } from "./model.js";
import { db } from "../../db/db.js";
import { usersTable } from "../../db/schema.js";
 
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "node:crypto";
import { accessToken, refreshToken, type userToken } from "./utils/token.js";

export class AuthenticationController {
  public async handleSignUp(req: Request, res: Response) {
    const validationResult = await signUpModel.safeParseAsync(req.body);

    if (validationResult.error)
      return res.status(400).json({
        message: `cross check the input details`,
        error: validationResult.error.issues,
      });

    const { firstName, lastName, email, password } = validationResult.data;

    const checkUserEmail = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (checkUserEmail.length > 0) {
      return res
        .status(400)
        .json({ message: `user with email ${checkUserEmail} already exist` });
    }

    // const { salt, hash } = token( );

    const salt = randomBytes(32).toString("hex");
    const hash = createHmac("sha256", salt).update(password).digest("hex");

    const [result] = await db
      .insert(usersTable)
      .values({
        firstName,
        lastName,
        email,
        password: hash,
        salt,
      })
      .returning({ id: usersTable.id });

    return res
      .status(201)
      .json({ message: `user signup success`, data: { id: result?.id } });
  }

  public async handleSignIn(req: Request, res: Response) {
    const userDetails = await signInModel.safeParseAsync(req.body);
    if (userDetails.error)
      return res.status(400).json({ message: `check the input fields` });
    const { email, password } = userDetails.data;

    const [checkUserEmail] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!checkUserEmail)
      return res
        .status(404)
        .json({ message: `user with ${checkUserEmail} does not exist` });

    const salt = checkUserEmail.salt;
    const hash = createHmac("sha256", salt!).update(password).digest("hex");

    if (checkUserEmail.password !== hash) {
      return res.status(400).json({ message: `incorrect email or password` });
    }

    const accessTokenValue = accessToken({
      id: checkUserEmail.id,
      email: checkUserEmail.email,
    });

    const refreshTokenValue = refreshToken({
      id: checkUserEmail.id,
      email: checkUserEmail.email,
    });

    const refreshSalt = randomBytes(32).toString("hex");
    const refreshHash = createHmac("sha256", refreshSalt)
      .update(refreshTokenValue)
      .digest("hex");

    const loginResult = await db.update(usersTable).set({
      refreshToken:refreshHash
    }).where(eq(usersTable.email, checkUserEmail.email))

    return res.json({message:`signin successful`, data:{email: checkUserEmail, acccestoken: accessTokenValue, refreshtoken: refreshTokenValue}})
  }

  public async handleMe(req:Request, res:Response){
        const {id} =  req.id! as userToken

     const [userInfo] = await db.select().from(usersTable).where(eq(usersTable.id, id))

     return res.json({
      firstName:userInfo?.firstName,
      lastName:userInfo?.lastName,
      email:userInfo?.email
     })
  }
}
