import { generateToken } from "../../common/utils/jwt";
import User from "./model.js";
import { ApiError } from "../../common/utils/api-errors.js";

const register = async ({ name, email, password, role }) => {
  const user = await User.findOne({ email });
  if (user) throw ApiError.conflict("user already exist");
  const { rawToken, hashedToken } = generateToken();

  const newUser = await user.create({
    name,
    email,
    password,
    role,
    verficationToken: hashedToken,
  });

  //send emailto user
};
