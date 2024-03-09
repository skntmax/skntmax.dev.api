import Express  from "express";
import { addCategory, getAllCategory } from "./controller";
import { FailureStatus, SuccessStatus } from "../../response_utils";
let category_router = Express.Router()



category_router.post('/add-category' , (req, res )=>{
   
    addCategory(req.body , req.files).then(response=>{
        res.send(SuccessStatus(response  ))
     }).catch(err=>{
         res.send(FailureStatus(err , "couldn't get categories" ))
     })
    
})



category_router.get('/get-categories' , (req, res )=>{
   
    getAllCategory(req.body , req.files).then(response=>{
        res.send(SuccessStatus(response  ))
     }).catch(err=>{
         res.send(FailureStatus(err , "couldn't get categories" ))
     })
    
})



export {category_router} 