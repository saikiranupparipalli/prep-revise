import type { Request, Response } from "express";
import { signUpModel } from "./model.js";
import { db } from "../../db/db.js";
import { usersTable } from "../../db/schema.js";

import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "node:crypto";

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
}
