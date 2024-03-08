import mongoose ,{Schema} from "mongoose";
import collection from "../collections/collections";

const rg_global_category_schema = new Schema({
     
     TITLE:String , 
     DISC:String,
     IMAGE:String,
     CREATED_ON:{
         type:Date, 
         default:()=> new Date()
     },
     MODIFIED_ON:{
        type:Date, 
        default:()=> new Date()
    }

})


const rg_global_category_model = mongoose.model(collection.rg_golbal_master_category ,rg_global_category_schema )

export { rg_global_category_model }