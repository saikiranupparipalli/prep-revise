import * as service from "./service.js";
import ApiResponse from "../../common/utils/api-responses.js";

const register = async (req, res) => {
  const user = await service.register(req.body);
  ApiResponse.created(res, "registration success", user);
};

const login = async (req, res) => {
  const { user, accessToken, refreshToken } = await service.login(req.body);

  const refreshCookie = res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const accessCookie = res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });

  ApiResponse.ok(res, "Login successful", {
    accessCookie,
    refreshCookie,
  });
};

const logOut = async (req, res) => {
  const user = await service.logOut(req.user.id);
  res.clearcookie("refreshToken");
  ApiResponse.ok(res, "Logout is successful");
};
const getMe = async (req, res) => {
  const user = await service.getMe(req.user.id);
  ApiResponse.ok(res, "user profile", user);
};

//complete verifyEmail, forgotPassword, resetPassword
const verifyEmail = async (req, res) => {
  await service.verifyEmail(req.params.token);
  ApiResponse.ok(res, "email verified successfully");
};

const forgotPassword = async (req, res) => {
  await service.forgotPassword(req.user.email);
  ApiResponse.ok(res, "password reset email is sent");
};

const resetPassword = async (req, res) => {
  await service.resetPassword(req.params.token, req.body.password);
  ApiResponse.ok(res, "password changed successfully");
};
export {
  register,
  login,
  logOut,
  getMe,
  verifyEmail,
  resetPassword,
  forgotPassword,
};
