import { rg_global_category_model } from "../../models/category_model"
import path from "node:path";
import { rgmcat_m } from "./model"
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { folders } from "../../constans";

const __dirname = dirname(fileURLToPath(import.meta.url));

 const getAllCategory= async(body , files)=>{
     try {
       
       // first saving catgory logo 

       if (!files) {
         return Promise.reject('Please provide logo too');
        }

       if(files) {
          let tmpFile = files.img
          const { name:originalFileName }  =tmpFile 
          let ext = originalFileName.split('.')[1]
          let fileName = Date.now()+"."+ext
          let dst = path.join(__dirname , `../../assets/Logo/${folders.CATEGORY_FOLDER}/`+fileName)
          console.log("dst",dst)
          
           tmpFile.mv(dst , (err, data)=>{
              if(err)  return Promise.reject(" category logo not saved")
              console.log("logo saved ")
           })
   
           
           body.img =`${folders.CATEGORY_FOLDER}/${fileName}` 
       }
      
        
      let rgmc_model = rgmcat_m(body)

      let new_cat = new rg_global_category_model(rgmc_model)
      
         await new_cat.save()
        return Promise.resolve({data:new_cat})
        return Promise.resolve({data:[]})
     
   }catch(err) {
      console.log("err", err )
        return Promise.reject({error:err})

     }

}


export {getAllCategory}