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

  ApiResponse.ok("Login successful", { accessToken, refreshToken });
};

const logOut = async (req, res) => {
  const user = await service.logOut(req.user.id);
  res.clearCookie("refreshToken");
  ApiResponse.ok("Logout Successful", user);
};

const newRefreshToken = async (req, res) => {
  const user = await service.newRefreshToken(req.user.id);
  res.send({accessToken, refreshToken})
  ApiResponse.created("New access, refresh tokens are sent.", user)
};
export { regiser, login, logOut };
