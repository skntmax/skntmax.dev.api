import { rg_global_category_model } from "../../models/category_model"

 const getAllCategory= async(body)=>{
     try {
       
        
        return Promise.resolve({data:[]})
     }catch(err) {
        return Promise.reject({error:err})
         
     }

}


export {getAllCategory}