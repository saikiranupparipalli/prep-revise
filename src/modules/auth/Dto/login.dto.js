import { globalDto } from "../../../common/config/dto/dto";
import joi from "joi"


class loginDto extends globalDto{
    static schema = Joi.object({
       email: Joi.string().lowercase().required(),
       password: Joi.string().min(8).max(14).required()
    })
}

export default loginDto