import Joi from "joi";
import globalDto from "../../../common/config/dto/dto";

class resetPassword extends globalDto {
  static schema = Joi.object({
    password: Joi.string()
      .min(8)
      .max(14)
      .pattern(/?=.*[A-Z])(?=.*\d)/)
      .message("password must contain at least one uppercase and one digit")
      .required(),
  });
}

export default resetPassword;
