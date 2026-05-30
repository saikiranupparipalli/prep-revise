import jwt from "jsonwebtoken"

export interface userToken{
    id: string
}
export const accessToken = (payload: userToken)=>{
    jwt.sign(payload, )
}