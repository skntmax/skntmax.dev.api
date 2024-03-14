import Express from "express";
import { FailureStatus, SuccessStatus } from "../../response_utils";
import { LoginUser, addUser } from "./controller";
let auth_router = Express.Router();

auth_router.post("/add-user", (req, res) => {
    
    addUser(req.body).then(response=>{
        res.send(SuccessStatus(response));
    }).catch(err=>{
        res.send(FailureStatus(err, "some error while creating a new user "));
    })
     
});



auth_router.post("/login-user", (req, res) => {
    
    LoginUser(req.body).then(response=>{
        res.send(SuccessStatus(response));
    }).catch(err=>{
        res.send(FailureStatus(err, "some error while creating a new user "));
    })
     
});



export { auth_router };
