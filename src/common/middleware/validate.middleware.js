import ApiError from "../utils/api-errors.js"

const validate = (dtoclass)=>{
    return (req, res, next)=>{
        const {errors, value} = dtoclass.validate(req.body)
        if(errors){
            throw ApiError.badRequest()
        }
        req.body = value
        next()
    }
    
}

export default validate