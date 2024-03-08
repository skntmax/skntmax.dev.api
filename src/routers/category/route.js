import Express  from "express";
import { getAllCategory } from "./controller";
import { FailureStatus, SuccessStatus } from "../../response_utils";
let category_router = Express.Router()



category_router.get('/get-all-category' , (req, res )=>{
     getAllCategory().then(response=>{
        res.send(SuccessStatus(response  ))
     }).catch(err=>{
         res.send(FailureStatus(err , "couldn't get categories" ))
     })
    
})





export {category_router} 