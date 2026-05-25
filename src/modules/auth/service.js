import {
  generateAccessToken,
  generateRefreshToken,
  generateToken,
  verifyRefreshToken,
} from "../../common/utils/jwt.js";
import User from "./model.js";
import ApiError from "../../common/utils/api-errors.js";
import {
  sendVerificationEmail,
  sendResetPasswordEmail,
} from "../../common/utils/email.js";

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
  try {
    await sendVerificationEmail(email, rawToken);
  } catch (err) {
    console.error("Failed to send verification email:", err.message);
  }
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
};
const logOut = async (userid) => {
  const user = await User.findById(userid);
  if (!user) throw ApiError.forbidden("user not found");

  await User.findByIdAndUpdate(userid, { refreshToken: null });
};

//complete verifyEmail
const verifyEmail = async (token) => {
  const trimmedToken = String(token).trim();
  if (!trimmedToken) throw ApiError.badreq("invalid token");

  const hashedInput = hashToken(trimmedToken);
  let user = await User.findOne({ verificationToken: hashedInput }).select(
    "+verificationToken",
  );
  if (!user) {
    user = await User.findOne({ verificationToken: trimmedToken }).select(
      "+verificationToken",
    );
  }

  if (!user) {
    throw ApiError.badreq("invalid token");
  }

  await User.findByIdAndUpdate(user._id, {
    $set: { isverified: true },
    $unset: { verificationToken: 1 },
  });
  return user;
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
  const refreshToken = generateRefreshToken();
  const hashToken = crypto
    .createhash("sha256")
    .update(refreshToken)
    .digest("hex");

  user.refreshToken = hashToken;
  await user.save(refreshToken);
  return { accessToken, refreshToken };
};
const forgotPassword = async (email) => {
  const user = await User.findOne({ email }).select(
    "+resetPassword +resetPasswordExpires",
  );
  if (!user) throw ApiError.notfound("user not found");
  const { rawToken, hashedToken } = generateToken();

  user.resetPassword = hashedToken;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
  await user.save();
  //complete sendResetPasswordEmail
  return { email, rawToken };
};

//complete resetPassword
const resetPassword = async (token, newPassword) => {
  const hashedToken = hashToken(token);

  const user = await User.findOne({
    resetPassword: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  }).select("+resetPassword +resetPasswordExpires");

  if (!user) throw ApiError.badreq("invalid token");

  user.password = newPassword;
  user.resetPassword = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
};
const getMe = async (userid) => {
  const user = await User.findById(userid);
  if (!user) throw ApiError.forbidden("user not found");
  return user;
};

export {
  register,
  login,
  logOut,
  newRefreshToken,
  forgotPassword,
  getMe,
  verifyEmail,
  resetPassword,
};
