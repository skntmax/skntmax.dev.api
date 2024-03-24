import Jwt from "jsonwebtoken"
import { secret_keys } from "../constans"
import { FailureStatus } from "../response_utils"

export async function varifyToken(req, res, next) {
    try{
    const token = req.headers['authorization']
    if(!token) return 'Unauthorize user'
    const bearer_token = token.split(' ')[1]  
    let decoded =await  Jwt.verify(bearer_token, secret_keys.token_secret )
    console.log("decoded" ,decoded)
    req.userId =decoded._id
    return next()
      }catch(err){
        console.log("err", err.message)
        res.send(FailureStatus(err, "un autherised user "));
      }
    
}