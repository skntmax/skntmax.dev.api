import { category_router } from "../routers/category/route";
import express  from "express";
import fileupload from "express-fileupload"
import path from "node:path";

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

function globalMiddleware(app) {
     app.use(express.static(path.join(__dirname ,"../assets/Logo/")))
     app.use(fileupload());
     app.use(express.json())
    
    app.use('/v1',category_router )

     
}


export default globalMiddleware