import mongoose ,{Schema} from "mongoose";
import collection from "../collections/collections";
const ObjectId = Schema.Types.ObjectId;

const rg_global_category_schema = new Schema({
     
     TITLE:String , 
     DISC:String,
     IMAGE:String,
     ORIGINAL_FILE_NAME:String,
     MULTI:{
       type:Boolean,
       default:()=> false   
     },
     SUB_CAT:{
        type:Array,
        default:()=> []   
      },
     CREATED_ON:{
         type:Date, 
         default:()=> new Date()
     },
     MODIFIED_ON:{
        type:Date, 
        default:()=> new Date()
    }

})





const rg_global_sub_category_schema = new Schema({
     
    TITLE:String , 
    DISC:String,
    CAT_ID: {
        type: ObjectId,
        ref: collection.rg_golbal_master_category,
      },

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
const rg_global_sub_category_model = mongoose.model(collection.rg_golbal_master_sub_category ,rg_global_sub_category_schema )

export { rg_global_category_model ,rg_global_sub_category_model  }