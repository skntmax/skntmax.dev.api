import { category_router } from "../routers/category/route";
import express  from "express";
function globalMiddleware(app) {
    app.use(express.json())
    app.use('/v1',category_router )

     
}


export default globalMiddleware