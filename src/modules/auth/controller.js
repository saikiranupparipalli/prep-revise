import * as service from "./service.js";
import ApiResponse from "../../common/utils/api-responses.js";
import { useImperativeHandle } from "react";

const regiser = async (req, res) => {
  const user = await service.register(req.body);
  return ApiResponse.created(res, "sing-up successful", user);
};

const login = async (req, res) => {
  const { user, accessToken, refreshToken } = await service.login(req.body);
  const accessToken = res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
  const refreshToken = res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const response = ApiResponse.ok("Login successful", {
    accessToken,
    refreshToken,
  });
  res.send(response);
};

const logOut = async (req, res) => {
  const user = await service.logOut(req.user.id);
  res.clearCookie("refreshToken");
  ApiResponse.ok("Logout Successful", user);
};

const newRefreshToken = async (req, res) => {
  const { accessToken, refreshToken } = await service.newRefreshToken(
    req.user.id,
  );
  const response = ApiResponse.created(
    "New access, refresh tokens are sent.",
    accessToken,
    refreshToken,
  );
  res.send(response);
};

const forgotPassword = async (req, res) => {
  const { email, rawToken } = await service.forgotPassword(req.body.email);
  //here we will write an email code of link
  const response = ApiResponse.sent("email link is sent", email, rawToken)
  res.send(response)
};

const getMe = async(req, res)=>{
  const user = await service.getMe(req.user.id)
  const response = ApiResponse.ok("profile details", user)
  res.send(response)
}
export { regiser, login, logOut, newRefreshToken, forgotPassword, getMe};
