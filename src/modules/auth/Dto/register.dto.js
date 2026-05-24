import Joi from "joi";
import { globalDto } from "../../../common/config/dto/dto";

class registerDto extends globalDto{
    static schema = Joi.object({
        name:Joi.string().min(3).max(14).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(8).max(14).required(),
        role:Joi.string().required()
    })
}

export default registerDto