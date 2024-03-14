import mongoose, { Schema } from "mongoose";
import collection from "../collections/collections";

const rg_global_users_schema = new Schema({
     USERNAME:String , 
     EMAIL:{
      type:String,   
    },
    PASSWORD:String , 
    CREATED_ON:{
        type:Date, 
        default:()=> new Date()
    },
    MODIFIED_ON:{
       type:Date, 
       default:()=> new Date()
   }

})


let user_model = mongoose.model(collection.rg_golbal_master_user ,rg_global_users_schema )


export {user_model}