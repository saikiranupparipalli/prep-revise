import  globalDto  from "../../../common/config/dto/dto.js";
import Joi from "joi"


class loginDto extends globalDto{
    static schema = Joi.object({
       email: Joi.string().lowercase().required(),
       password: Joi.string().min(8).max(14).required()
    })
}

export default loginDto