import {
  generateAccessToken,
  generateRefreshToken,
  generateToken,
  verifyRefreshToken,
} from "../../common/utils/jwt";
import User from "./model.js";
import { ApiError } from "../../common/utils/api-errors.js";

const hashToken = (token) => {
  crypto.createhash("sha256").update(token).digest("hex");
};

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

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw ApiError.unauthorized("wrong email or password");

  const isMatch = await user.comparePassword("password");
  if (!isMatch) throw ApiError.unauthorized("invalid email or password");

  if (!user.isverified) throw ApiError.forbidden("please verify your email");

  const accessToken = generateAccessToken({
    email: user.email,
    role: user.role,
    name: user.name,
  });

  const refreshToken = generateRefreshToken({ id: user._id });

  user.refreshToken = hashToken(refreshToken);

  await user.save({ validateBeforeSave: false });

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  return { user: userObj, accessToken, refreshToken };
}; //incomplete
const logOut = async (userid) => {
  const user = await User.findById(userid);
  if (!user) throw ApiError.forbidden("user not found");

  await User.findByIdAndUpdate(userid, { refreshToken: null });
};
const newRefreshToken = async (token) => {
  if (!token) ApiError.unauthorized("refresh token is missing");

  const decoded = verifyRefreshToken(token);

  const user = await User.findById(decoded.id).select("+refreshToken");
  if (!user) throw ApiError.unauthorized("user not found");

  const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });
  const refreshToken = generateRefreshToken( );
  const hashToken = crypto
    .createhash("sha256")
    .update(refreshToken)
    .digest("hex");

  user.refreshToken = hashToken;
  await user.save(refreshToken);
  return { accessToken, refreshToken };
};

export { register, login, logOut };
