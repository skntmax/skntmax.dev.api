import  Express  from "express";
import dotenv from "./dotenv";
import globalMiddleware from "./global_middlware/middleware";
import { SuccessStatus } from "./response_utils";
import { initDb } from "./connection/db_connect";

let app = Express()

// console.log("dotenv.DB" ,dotenv.DB_URL)

await initDb()

app.get('/check-health' ,(req, res)=>{
    console.log("health check ok !!")
       res.send(SuccessStatus([],"heath check success"))
   })

globalMiddleware(app) 




app.listen(dotenv.PORT ,()=>[
     console.log(`server started at ${dotenv.PORT} `)
])