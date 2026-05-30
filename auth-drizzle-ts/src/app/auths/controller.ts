import type { Request, Response } from "express";
import { signUpModel } from "./model.js";
import { db } from "../../db/db.js";
import { usersTable } from "../../db/schema.js";

class AuthenticationController {
  public async handleSignUp(req: Request, res: Response) {
    const validationResult = await signUpModel.safeParseAsync(req.body);

    if (validationResult.error)
      return res
        .status(400)
        .json({
          message: `cross check the input details`,
          error: validationResult.error,
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

    
  }
}
