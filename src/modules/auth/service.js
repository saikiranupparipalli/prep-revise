import { generateToken, verifyRefreshToken } from "../../common/utils/jwt";
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

const login = async({email, password})=>{
  await User.findOne({email}).select("+password")
  if(!user) throw ApiError.unauthorized("wrong email or password")

  

}//incomplete

const newRefreshToken = async(token)=>{
  if(!token) ApiError.unauthorized("refresh token is missing")

  const decoded = verifyRefreshToken(token)

  const user = await User.findById(decoded.id).select("+refreshToken")
}

export {register}