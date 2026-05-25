import ApiError from "../../common/utils/api-errors.js";
import { verifyAccessToken } from "../../common/utils/jwt.js";
import User from "./model.js";
const authenticate = async (req, res, next) => {
  if (!req.headers.authorization?.startsWith("Bearer")) {
    throw ApiError.unauthorized("you are unauthorized");
  }
  const token = req.headers.authorization.split(" ")[1];
  const decoded = verifyAccessToken(token);

  const user = await User.findById(decoded.findById);
  if (!user) throw ApiError.unauthorized("user not found");

  req.user = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  next();
};

const authorization = async (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw ApiError.forbidden("this is restricted access area.");
    }
  };
  next();
};
export {authenticate, authorization}