import Joi from "joi";
import globalDto from "../../../common/config/dto/dto";

class forgotPassword extends globalDto {
  static schema = Joi.object({
    email: Joi.string().email().required(),
  });
}

export default forgotPassword;
