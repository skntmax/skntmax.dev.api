import { rg_global_category_model, rg_global_sub_category_model } from "../../models/category_model";
import path from "node:path";
import { rgmcat_m } from "./model";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { folders } from "../../constans";

const __dirname = dirname(fileURLToPath(import.meta.url));

const addCategory = async (body, files) => {
  try {
    // first saving catgory logo

    if (!files) {
      return Promise.reject("Please provide logo too");
    }

    if (files) {
      let tmpFile = files.img;
      const { name: originalFileName } = tmpFile;
      let ext = originalFileName.split(".")[1];
      let fileName = Date.now() + "." + ext;
      let dst = path.join(
        __dirname,
        `../../assets/Logo/${folders.CATEGORY_FOLDER}/` + fileName
      );
      console.log("dst", dst);

      tmpFile.mv(dst, (err, data) => {
        if (err) return Promise.reject(" category logo not saved");
        console.log("logo saved ");
      });

      body.img = `${folders.CATEGORY_FOLDER}/${fileName}`;
      body.originalFileName = originalFileName;
    }

     
    let rgmc_model = rgmcat_m(body);
    
    let new_cat = new rg_global_category_model(rgmc_model);
    await new_cat.save();
       
    if(body.multi) {
       let prmsub_cat_prms = await Promise.all(body.sub_cat.split('==').map(async (ele)=>{
        let new_sub_cat = new rg_global_sub_category_model({
         TITLE:ele,
         CAT_ID:new_cat._id

        })
        return await new_sub_cat.save()
      }))  
      }

    return Promise.resolve({ data: new_cat });
  } catch (err) {
    console.log("err", err);
    return Promise.reject({ error: err.message });
  }
};

async function getAllCategory() {
  try {
    let catgs = await rg_global_category_model.find({});
    return Promise.resolve({ data: catgs });
  } catch (err) {
    return Promise.reject({ error: err.message });
  }
}

async function getCatIds() {
  try {
    let catgs = await rg_global_category_model.find({}, { _id: 1, TITLE: 1 });

    return Promise.resolve({ data: catgs });
  } catch (err) {
    return Promise.reject({ error: err });
  }
}

// async function fn() {
//    try {

//    return Promise.resolve({data:[]})
//    }catch(err) {
//      return Promise.reject({error:err})

//    }

// }

export { addCategory, getAllCategory, getCatIds };
