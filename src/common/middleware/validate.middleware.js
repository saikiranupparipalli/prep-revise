import ApiErrors from ""

const validate = (dtoclass)=>{
    (req, res, next)=>{
        const {errors, value} = dtoclass.validate(req.body)
        if(errors){
            throw ApiErrors.badRequest()
        }
        req.body = value
    }
}

export default validate