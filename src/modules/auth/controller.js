import * as service from "./service.js"
import ApiResponse from "../../common/utils/api-responses.js"

const regiser = async(req, res)=>{
   const user =  await service.register(req.body)
    return ApiResponse.created(res, "sing-up successful", user)
}

export {regiser}