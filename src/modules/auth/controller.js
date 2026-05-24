import * as service from "./service.js";
import ApiResponse from "../../common/utils/api-response.js";

const register = async (req, res) => {
  const user = await service.register(req.body);
  const response = ApiResponse.created("registration success", user);
  res.send(response);
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

  const response = ApiResponse.ok(res, "Login successful", {
    accessCookie,
    refreshCookie,
  });
  res.send(response);
};

const logOut = async (req, res) => {
  const user = await service.logOut(req.user.id);
  res.clearcookie("refreshToken");
  const response = ApiResponse.ok("Logout is successful", user);
  res.send(response);
};
const getMe = async (req, res) => {
  const user = await service.getMe(req.user.id);
  const response = ApiResponse.ok(res, "user profile", user);
  res.send(response);
};

export {register, login, logOut, getMe}